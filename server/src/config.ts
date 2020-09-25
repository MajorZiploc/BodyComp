export const config = {
  host: 'localhost',
  port: 57153,
  connectionString: 'Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;',
  routes: {
    cors: {
      origin: ['http://localhost:3000'], // an array of origins or 'ignore'
      maxAge: 86400,
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Access-Control-Request-Method'], // an array of strings - 'Access-Control-Allow-Headers'
      exposedHeaders: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Access-Control-Request-Method'], // an array of exposed headers - 'Access-Control-Expose-Headers',
      credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    },
    payload: {
      allow: ['application/json'],
    },
    security: false,
  },
};
