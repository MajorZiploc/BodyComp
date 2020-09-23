import React from 'react';
import { Form } from 'react-bootstrap';

function CSVForm() {
  return (
    <Form>
      <Form.Group>
        <Form.File id='CSVFileUpload' label='Upload Daily metrics CSV' multiple type='file' />
      </Form.Group>
    </Form>
  );
}

export default CSVForm;
