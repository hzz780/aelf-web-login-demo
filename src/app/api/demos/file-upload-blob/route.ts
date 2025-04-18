import { writeFile } from 'fs/promises';
// const fs = require('fs');
import { NextResponse } from 'next/server';
// const { Blob } = require('buffer');

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log('formData blob: ', formData);

  const file = formData.get('Code') as any;
  const manifest = formData.get('Manifest') as any;
  console.log('file: ', file);
  console.log('manifest: ', manifest);

  const fileBuffer = await file.arrayBuffer();
  console.log(
    'arrayBuffer, Buffer.from(arrayBuffer): ',
    __dirname,
    Buffer.from(fileBuffer),
  );
  await writeFile(`${__dirname}/${manifest}`, Buffer.from(fileBuffer));

  return new NextResponse('success', { status: 200 });
}
