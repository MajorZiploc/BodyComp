import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, FormGroup, FormFile, Toast } from 'react-bootstrap';
import { upsertApi } from '../CSVParser';
import { withRouter } from 'react-router-dom';

interface ToastInfo {
  message: string;
  variant: string;
  delay: number;
}

function CSVForm() {
  const [files, setFiles] = useState<File[]>();
  const [toast, setToast] = useState<ToastInfo>();

  async function onSubmit(e: any) {
    try {
      const success = await upsertApi(files ?? []);
      setToast({ message: 'Success', variant: 'success', delay: 3000 });
    } catch (err) {
      setToast({ message: 'Failed to upload CSV(s)' + err, variant: 'danger', delay: 10000 });
    }
  }

  function onChangeFile(e: any) {
    const fileList: FileList = e?.target?.files ?? undefined;
    const files = [];
    for (var i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setFiles(files);
  }

  return (
    <>
      <Form onSubmit={(e: any) => onSubmit(e)}>
        <FormGroup role='form'>
          <FormFile
            id='CSVFileUpload'
            label='Upload Daily metrics CSV'
            multiple
            type='file'
            onChange={(e: any) => onChangeFile(e)}
          />
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </FormGroup>
      </Form>
      {toast && (
        <Toast className={'alert-' + toast.variant}>
          <Toast.Header>
            <strong className='mr-auto'>Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      )}
    </>
  );
}

export default withRouter(CSVForm);