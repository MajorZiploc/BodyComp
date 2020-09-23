import React from 'react';
import { Form, Button, FormGroup, FormFile } from 'react-bootstrap';

function CSVForm() {
  function onSubmit(e: any) {
    var x = e.target.files[0];
    console.log('submitted');
    console.log(e);
  }

  function onSelect(e: any) {
    console.log('submitted');
    console.log(e);
  }

  return (
    <Form onSubmit={(e: any) => onSubmit(e)}>
      <FormGroup role='form'>
        <FormFile
          id='CSVFileUpload'
          label='Upload Daily metrics CSV'
          multiple
          type='file'
          onSelect={(e: any) => onSelect(e)}
        />
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
}

export default CSVForm;
