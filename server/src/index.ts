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

  // TODO: rename these to match the csv file header names and the weight units name from the front end!!
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
          [j.DyDate, j.DyCalories, j.DyMorningWeight, j.DyBodyFatPercentage, j.DyMuscleMassPercentage]
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
