import { Server, Request, ResponseToolkit } from "@hapi/hapi";

import * as ADODB from "node-adodb";

const connection = ADODB.open(
  "Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;"
);

let command = "select * from dbo.Day;";

connection
  .query(command)
  .then((data) => {
    console.log("here");
    console.log(data);
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.log("here2");
    console.error(error);
  });

const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit) => {
      return "Hello World!";
    },
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
