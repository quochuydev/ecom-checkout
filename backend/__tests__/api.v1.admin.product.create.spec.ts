import { beforeAll, describe, expect, it } from 'vitest';
import handler from '../apis/api.v1.admin.product.create';
import { getInjection } from '../core-test/server';
import fixture from './api.v1.admin.product.create.fixture';

describe('Testing', async () => {
  it(`With invalid payload from body, validate will be successful`, async () => {
    const result = await handler.validate(fixture.valid, getInjection());
    expect(result).toBeDefined();
  });

  it(`With valid payload from body, handle will be successful`, async () => {
    const result = await handler.handle(fixture.valid, getInjection());
    console.log(`debug:result.body`, result.body);
    expect(result).toBeDefined();
    expect(result.body?.id).toBeDefined();
  });
});
