import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility';
import { config } from './config';
import * as Joi from '@hapi/joi';
import * as sqlstring from 'sqlstring';
import * as ADODB from 'node-adodb';

const init = async () => {
  const server: Server = new Server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['http://localhost:3000'], // an array of origins or 'ignore'
        maxAge: 86400,
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Access-Control-Request-Method'], // an array of strings - 'Access-Control-Allow-Headers'
        exposedHeaders: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Access-Control-Request-Method'], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: [
          'WWW-Authenticate',
          'Server-Authorization',
          'Accept',
          'Access-Control-Allow-Origin',
          'Access-Control-Request-Method',
          'Allow-Origin',
          'Origin',
          'access-control-allow-origin',
          'access-control-request-method',
          'allow-origin',
          'origin',
        ], // an array of additional exposed headers
        additionalHeaders: [
          'Access-Control-Allow-Origin',
          'Access-Control-Request-Method',
          'Allow-Origin',
          'Origin',
          'access-control-allow-origin',
          'access-control-request-method',
          'allow-origin',
          'origin',
        ],
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
      payload: {
        allow: ['application/json'],
      },
      security: false,
    },
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
    path: '/weight',
    handler: async (request: Request, h: ResponseToolkit) => {
      var sqlQuery = sqlstring.format(
        `SELECT 
          WuId
          ,WuLabel
          ,WuName
        FROM dbo.WeightUnits
        `,
        []
      );
      const connection = ADODB.open(config.connectionString);
      return await connection.query(sqlQuery);
    },
  });

  server.route({
    method: 'GET',
    path: '/day',
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      const dateFloor = new Date('01/01/1753');
      const dateCeiling = new Date('12/31/9999');
      const minDate = p.minDate != null ? new Date(p.minDate) : dateFloor;
      const maxDate = p.maxDate != null ? new Date(p.maxDate) : dateCeiling;
      var sqlQuery = sqlstring.format(
        `SELECT DyDate
          ,DyCalories
          ,DyMorningWeight
          ,DyBodyFatPercentage
          ,DyMuscleMassPercentage
          ,WuLabel
          ,WuName
        FROM dbo.Day as d
        INNER JOIN dbo.WeightUnits AS wu
          ON d.DyWeightUnitsId = wu.WuId
        WHERE d.DyDate >= ?
        AND d.DyDate <= ?
        `,
        [minDate, maxDate]
      );
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
      date: Joi.date().required(),
      calories: Joi.number().integer().positive().allow(null).required(),
      morning_weight: Joi.number().positive().allow(null).required(),
      body_fat_percentage: Joi.number().positive().allow(null).required(),
      muscle_mass_percentage: Joi.number().positive().allow(null).required(),
      weight_units_id: Joi.number().integer().positive().allow(null).required(),
    })
    .unknown(false);

  const arraySchema = Joi.array().items(objectSchema);

  const altSchema = Joi.alternatives().try(objectSchema, arraySchema);

  server.route({
    method: 'POST',
    path: '/bulkUpload',
    handler: async (request: Request, h: ResponseToolkit) => {
      const body = request.payload as any[];
      const connection = ADODB.open(config.connectionString);
      const truncate = `TRUNCATE TABLE dbo.StagingBulkUpload`;
      await connection.execute(truncate);

      body.forEach(async (j: any) => {
        const insert = sqlstring.format(
          `INSERT INTO dbo.StagingBulkUpload
            (DyDate,
            DyCalories,
            DyMorningWeight,
            DyBodyFatPercentage,
            DyMuscleMassPercentage)
          VALUES
            (?,
            ?,
            ?,
            ?,
            ?)
          `,
          [j.date, j.calories, j.morning_weight, j.body_fat_percentage, j.muscle_mass_percentage, j.weight_units_id]
        );
        await connection.execute(insert);
      });

      const upsert = `MERGE dbo.Day AS [Target]
          USING (SELECT 
          DyId,
          DyDate,
          DyCalories,
          DyMorningWeight,
          DyBodyFatPercentage,
          DyMuscleMassPercentage
          FROM dbo.StagingBulkUpload AS sbu) AS [Source] 
          ON [Target].DyDate = [Source].DyDate
          WHEN MATCHED THEN
            UPDATE SET 
            [Target].DyCalories=Source.DyCalories,
            [Target].DyMorningWeight=Source.DyMorningWeight,
            [Target].DyBodyFatPercentage=Source.DyBodyFatPercentage,
            [Target].DyMuscleMassPercentage=Source.DyMuscleMassPercentage
          WHEN NOT MATCHED THEN
            INSERT 
            (DyDate,
            DyCalories,
            DyMorningWeight,
            DyBodyFatPercentage,
            DyMuscleMassPercentage
            ) VALUES (Source.DyDate,[Source].DyCalories, Source.DyMorningWeight, Source.DyBodyFatPercentage, Source.DyMuscleMassPercentage);
        `;

      await connection.execute(upsert);

      // Clean up staging table
      await connection.execute(truncate);

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
