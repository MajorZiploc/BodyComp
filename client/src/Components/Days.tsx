import React, { useState, useEffect } from 'react';
import { data } from '../Data/DataFactory';

const Days = () => {
  const [hasError, setErrors] = useState(false);
  const [days, setDays] = useState({});

  async function fetchData() {
    data
      .getDays()
      .then((res: any) => {
        return setDays(res);
      })
      .catch(err => {
        return setErrors(err);
      });
  }

  useEffect(() => {
    fetchData();
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
