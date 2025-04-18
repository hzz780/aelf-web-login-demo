import { writeFile } from 'fs/promises';
// const fs = require('fs');
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log('formData: ', formData);

  const file = formData.get('file') as File;

  console.log('file: ', file);

  const fileBuffer = await file.arrayBuffer();
  console.log(
    'arrayBuffer, Buffer.from(arrayBuffer): ',
    __dirname,
    Buffer.from(fileBuffer),
  );
  await writeFile(`${__dirname}/${file.name}233`, Buffer.from(fileBuffer));

  return new NextResponse('success', { status: 200 });
}
