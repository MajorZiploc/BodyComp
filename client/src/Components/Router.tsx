import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeCharts from './HomeCharts';
import CSVForm from './CSVForm';

function Router() {
  return (
    <Switch>
      <Route path='/' exact strict component={HomeCharts} />
      <Route path='/bulkUpload' exact component={CSVForm} />
    </Switch>
  );
}

export default Router;
