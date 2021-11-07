import React, { useState, useEffect } from 'react';
import { data } from '../Data/DataFactory';
import { Day } from './../models';

const Days = () => {
  const [hasError, setErrors] = useState(false);
  const [days, setDays] = useState({});

  useEffect(() => {
    (async () => {
      (await data)
        .getDays()
        .then((res: Day[]) => {
          return setDays(res);
        })
        .catch(err => {
          return setErrors(err);
        });
    })();
  }, []);

  return (
    <div>
      <span>{JSON.stringify(days)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};

export default Days;
