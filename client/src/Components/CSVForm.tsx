import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, FormGroup, FormFile, Toast, Dropdown } from 'react-bootstrap';
import { upsertApi } from '../CSVParser';
import { withRouter } from 'react-router-dom';
import { Weight } from '../models';
import { data } from '../Data/DataFactory';
import { Fate } from '../Fate';
const sampleCsv = '/Files/SampleBodyCompEntries.csv';

interface ToastInfo {
  variant: string;
  header: string;
  body: string;
}

function CSVForm() {
  const [files, setFiles] = useState<File[]>();
  const [toast, setToast] = useState<ToastInfo>();
  const [weights, setWeights] = useState<Weight[]>();
  const [weightMeasureId, setWeightMeasureId] = useState<number>();

  function getFileNamesPrompt(files: File[] | undefined) {
    if (files) return 'Files: ' + files.map(f => f.name) + '.\n';
    else return '';
  }

  async function onSubmit() {
    try {
      if (weightMeasureId) {
        setToast({
          variant: 'info',
          header: 'Processing',
          body: 'Processing request... Please wait.',
        });
        const response = await upsertApi(files ?? [], weightMeasureId);
        if (Fate.SUCCESS === response.fate) {
          setToast({
            variant: 'success',
            header: response.fate,
            body: 'Data was successfully uploaded! ' + getFileNamesPrompt(files),
          });
        } else {
          setToast({
            variant: 'danger',
            header: response.fate,
            body: 'Data failed to upload.\n' + getFileNamesPrompt(files) + JSON.stringify(response.result),
          });
        }
      }
    } catch (err) {
      setToast({
        variant: 'danger',
        header: 'Extreme Failure',
        body: 'Data failed to upload.\n' + getFileNamesPrompt(files) + err,
      });
    }
  }

  useEffect(() => {
    const f = async () => {
      const weights = await data.getWeights();
      const firstWeight = weights?.find((w: any) => w)?.WuId ?? undefined;
      setWeightMeasureId(firstWeight);
      setWeights(weights);
    };
    f();
  }, []);

  function onChangeFile(e: any) {
    const fileList: FileList = e?.target?.files ?? undefined;
    const files = [];
    for (var i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setFiles(files);
  }

  function onWeightSelect(e: any) {
    const selectedId = e?.target?.value;
    const weight = weights?.find(w => '' + w.WuId === selectedId);
    setWeightMeasureId(weight?.WuId);
  }

  return (
    <>
      <a href={sampleCsv} download target={'_blank'}>
        Example CSV
      </a>
      {weights && (
        <>
          <Form>
            <FormGroup role='form'>
              <Form.Group controlId='exampleForm.SelectCustom'>
                <Form.Label>Custom select</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e: any) => onWeightSelect(e)}
                  defaultValue={weightMeasureId + ''}
                  custom
                >
                  {weights.map(w => (
                    <option key={w.WuId} value={w.WuId}>{`${w.WuName} (${w.WuLabel})`}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <FormFile
                id='CSVFileUpload'
                label='Upload Daily metrics CSV'
                multiple
                type='file'
                onChange={(e: any) => onChangeFile(e)}
              />
              <Button variant='primary' onClick={() => onSubmit()}>
                Submit
              </Button>
            </FormGroup>
          </Form>
          {toast && (
            <Toast className={'text-white bg-' + toast.variant}>
              <Toast.Header>
                <strong className='mr-auto'>{toast.header}</strong>
              </Toast.Header>
              <Toast.Body>{toast.body}</Toast.Body>
            </Toast>
          )}
        </>
      )}
    </>
  );
}

export default withRouter(CSVForm);
