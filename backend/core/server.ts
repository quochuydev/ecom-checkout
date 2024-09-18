import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import configuration from '../configuration';
import { handlers } from '../handlers';
import PrismaService from './prisma-service';
import RedisService from './redis-service';
import { APIHandler, Injection } from './types';

export async function startServer(options: {
  defaultAuthSubjects?: string[];
  unauthorizedSubjects?: string[];
}) {
  const redisService = configuration.redis.url
    ? await RedisService(configuration.redis.url)
    : undefined;
  const prismaService = PrismaService(configuration.postgres.url);

  const injection: Injection = {
    redisService,
    prismaService,
  };

  const app = express();

  app.use(
    cors({
      // credentials: true,
      // origin: true,
      origin: 'http://localhost:3333',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.get('/', (_: Request, response: Response) => {
    response.status(200).send(`ok - ${configuration.buildVersion}`);
  });

  app.post('/api/:subject', async (request: Request, response: Response) => {
    try {
      const subject = request.params.subject;
      if (!subject) throw new Error('invalid subject');

      const { defaultAuthSubjects = [], unauthorizedSubjects = [] } = options;

      if (!unauthorizedSubjects.includes(subject)) {
        for (const authSubject of defaultAuthSubjects) {
          await processHandler({ subject: authSubject, injection, request });
        }
      }

      const result = await processHandler({ subject, injection, request });

      response.status(result.code).send(result.body || {});
    } catch (error) {
      response
        .status(error.code || 500)
        .send({ error, message: error.message });
    }
  });

  app.listen(configuration.port, () => {
    console.log(`App listening on port ${configuration.port}`);
  });

  process
    .on('unhandledRejection', console.error)
    .on('uncaughtException', console.error)
    .on('beforeExit', () =>
      Promise.allSettled([
        redisService?.dispose(),
        prismaService?.$disconnect(),
      ])
    );
}

async function processHandler(params: {
  subject: string;
  injection: Injection;
  request: Request;
}) {
  const { subject, injection, request } = params;
  if (!subject) throw new Error('invalid subject');

  const handler = handlers.find((h) => h.subject === subject) as APIHandler;
  if (!handler) throw new Error('subject not found');

  const validateResult = await handler.validate(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  request.headers = { ...request.headers, ...(validateResult.headers || {}) };

  const authorizeResult = await handler.authorize(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  request.headers = { ...request.headers, ...(authorizeResult.headers || {}) };

  const result = await handler.handle(
    {
      headers: request.headers,
      body: request.body,
    },
    injection
  );

  return result;
}
