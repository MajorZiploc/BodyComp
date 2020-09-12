import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { jsonComparer as jc, jsonRefactor as jr } from 'json-test-utility'
import * as Joi from '@hapi/joi'
import * as sql from 'sql-query';

import * as ADODB from "node-adodb";

// const connection = ADODB.open(
//   "Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;"
// );

// let command = "select * from dbo.Day;";

// connection
//   .query(command)
//   .then((data) => {
//     console.log("here");
//     console.log(data);
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch((error) => {
//     console.log("here2");
//     console.error(error);
//   });

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit) => {
      var p = request.query;
      console.log(p);
      return p;
    },
  });

  server.route({
    method: "GET",
    path: "/day",
    handler: (request: Request, h: ResponseToolkit) => {
      const expectedKeys = [
        "date",
        "morningWeight",
        "morningWeightUnits",
        "calories",
        "bodyFatPercentage",
        "muscleMassPercentage"
      ];
      var p = request.query;
      console.log(p);
      var sqlSelect = sql.Query().select();
 
      return sqlSelect
        .from('day')
        .where({ col: sql.gte(1) })
        .build();
      // return p;
    },
      options: {
        validate: {
            query: Joi.object({
                minDate: Joi.date(),
                maxDate: Joi.date()
                // minMorningWeight: Joi.number().integer().positive(),
                // maxMorningWeight: Joi.number().integer().positive(),
                // minCalories: Joi.number().positive(),
                // bodyFatPercentage: Joi.number().positive(),
                // muscleMassPercentage: Joi.number().positive()
            }) as any
        }
    }
  });

  server.route({
    method: "GET",
    path: "/foo",
    handler: (request: Request, h: ResponseToolkit) => {
      return { foo: "bar" };
    },
  });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
