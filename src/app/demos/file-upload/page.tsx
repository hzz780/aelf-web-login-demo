'use client';
import React, { useState } from 'react';

const uploadFileBlob = async (Code: any) => {
  const formData = new FormData();
  const CodeBlob = new Blob([Code], { type: Code.type });
  formData.append('Manifest', 'blobFile.dll');
  formData.append('Code', CodeBlob);
  // formData.append('Code', Code.originFileObj);
  console.log('Code', Code);
  // console.log('Code originFileObj', Code.originFileObj);

  console.log(formData);

  const response = await fetch('/api/demos/file-upload-blob', {
    method: 'POST',
    body: formData,
    headers: {
      // 'Content-Type': 'multipart/form-data', // don't add Content-Type
      // Authorization: `${Authorization.token_type} ${Authorization.access_token}`,
    },
  });
  console.log(response);
  return 'res';
};

const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  // formData.append("file", file.ori);

  const response = await fetch('/api/demos/file-upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res)
    .catch((err) => {
      throw new Error('upload file failed');
    });

  return response;
};

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await uploadFile(selectedFile);
  };

  const handleSubmitBlob = async (event: any) => {
    event.preventDefault();

    await uploadFileBlob(selectedFile);
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">upload file</button>
      </form>

      <div>Blob solution</div>
      <form onSubmit={handleSubmitBlob} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">upload file blob</button>
      </form>
    </>
  );
};

export default FileUploadForm;
