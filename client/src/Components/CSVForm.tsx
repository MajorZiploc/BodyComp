import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, FormGroup, FormFile } from 'react-bootstrap';

function CSVForm() {
  const [files, setFiles] = useState<File[]>();

  function onSubmit(e: any) {
    const ns = files?.map(f => f.name);
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
  );
}

export default CSVForm;
