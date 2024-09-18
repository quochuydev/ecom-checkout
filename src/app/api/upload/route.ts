import { prisma } from '@/lib/prisma';
import * as dateFn from 'date-fns';
import f from 'fs/promises';
import mime from 'mime';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get('file') as Blob | null;

  if (!file) {
    return NextResponse.json(
      { error: 'File blob is required.' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`;
  const uploadDir = path.join(process.cwd(), 'public', relativeUploadDir);

  try {
    await f.stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await f.mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        'Error while trying to create directory when uploading a file\n',
        e,
      );
      return NextResponse.json(
        {
          error: 'Something went wrong.',
        },
        {
          status: 500,
        },
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      '',
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

    await f.writeFile(`${uploadDir}/${filename}`, buffer);

    const image = await prisma.image.create({
      data: {
        name: file.name,
        alt: file.name,
        src: `${relativeUploadDir}/${filename}`,
      },
    });

    return NextResponse.json({
      fileId: image.id,
      fileUrl: `${relativeUploadDir}/${filename}`,
    });
  } catch (e) {
    console.error('Error while trying to upload a file\n', e);

    return NextResponse.json(
      {
        error: 'Something went wrong.',
      },
      {
        status: 500,
      },
    );
  }
}
