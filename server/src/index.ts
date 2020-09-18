import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import { config } from './config';
import * as Joi from '@hapi/joi';
//@ts-ignore
import * as sql from 'sql-query';
import * as ADODB from 'node-adodb';

const connection = ADODB.open(
  'Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;'
);

// TODO: add cors settings
// let configureCors (builder : CorsPolicyBuilder) =
//     builder.WithOrigins("http://localhost:3000")
//            .AllowAnyMethod()
//            .AllowAnyHeader()
//            |> ignore

const init = async () => {
  const server: Server = new Server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      console.log(p);
      return p;
    },
  });

  server.route({
    method: 'GET',
    path: '/day',
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      console.log(p);
      var sqlSelect = sql.Query('MSSQL').select();
      const dateFloor = new Date('01/01/1753');
      const dateCeiling = new Date('12/31/9999');
      const minDate = p.minDate != null ? new Date(p.minDate) : dateFloor;
      const maxDate = p.maxDate != null ? new Date(p.maxDate) : dateCeiling;
      const sqlQuery = sqlSelect
        .from('day')
        .select([
          'DyDate',
          'DyCalories',
          'DyMorningWeight',
          'DyWeightUnitsId',
          'DyBodyFatPercentage',
          'DyMuscleMassPercentage',
        ])
        .where({ DyDate: sql.between(minDate, maxDate) })
        .build();
      // return connection.query(sqlQuery).then(data => data);
      return { day: 'tihs' };
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
