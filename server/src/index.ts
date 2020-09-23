import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import { config } from './config';
import * as Joi from '@hapi/joi';
//@ts-ignore
import * as sql from 'sql-query';
import * as ADODB from 'node-adodb';

const init = async () => {
  const server: Server = new Server({
    port: config.port,
    host: config.host,
    routes: config.routes,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      return p;
    },
  });

  server.route({
    method: 'GET',
    path: '/day',
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      var sqlSelect = sql.Query('MSSQL').select();
      const dateFloor = new Date('01/01/1753');
      const dateCeiling = new Date('12/31/9999');
      const minDate = p.minDate != null ? new Date(p.minDate) : dateFloor;
      const maxDate = p.maxDate != null ? new Date(p.maxDate) : dateCeiling;
      const sqlQuery = sqlSelect
        .from('day')
        .select(['DyDate', 'DyCalories', 'DyMorningWeight', 'DyBodyFatPercentage', 'DyMuscleMassPercentage'])
        .from('weightunits', 'WuId', 'DyWeightUnitsId')
        .select(['WuName', 'WuLabel'])
        .where({ DyDate: sql.between(minDate, maxDate) })
        .build();
      const connection = ADODB.open(config.connectionString);
      return connection.query(sqlQuery).then(data => data);
    },

    options: {
      validate: {
        query: Joi.object({
          minDate: Joi.date(),
          maxDate: Joi.date(),
          // minMorningWeight: Joi.number().integer().positive(),
          // maxMorningWeight: Joi.number().integer().positive(),
          // minCalories: Joi.number().positive(),
          // bodyFatPercentage: Joi.number().positive(),
          // muscleMassPercentage: Joi.number().positive()
        }) as any,
      },
    },
  });

  const objectSchema = Joi.object()
    .keys({
      DyDate: Joi.date().required(),
      DyCalories: Joi.number().integer().positive().allow(null).required(),
      DyMorningWeight: Joi.number().positive().allow(null).required(),
      DyBodyFatPercentage: Joi.number().positive().allow(null).required(),
      DyMuscleMassPercentage: Joi.number().positive().allow(null).required(),
      DyWeightUnitsId: Joi.number().positive().allow(null).required(),
    })
    .unknown(false);

  const arraySchema = Joi.array().items(objectSchema);

  const altSchema = Joi.alternatives().try(objectSchema, arraySchema);

  server.route({
    method: 'POST',
    path: '/bulkUpload',
    handler: (request: Request, h: ResponseToolkit) => {
      const body = request.payload;
      return { message: 'Upsert was successful' };
    },
    options: {
      validate: {
        payload: altSchema as any,
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/foo',
    handler: (request: Request, h: ResponseToolkit) => {
      return { foo: 'barz' };
    },
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
