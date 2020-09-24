export const config = {
  host: 'localhost',
  port: 57153,
  connectionString: 'Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;',
  routes: {
    cors: {
      origin: ['http://localhost:3000'], // an array of origins or 'ignore'
      maxAge: 86400,
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // an array of strings - 'Access-Control-Allow-Headers'
      exposedHeaders: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // an array of exposed headers - 'Access-Control-Expose-Headers',
      additionalExposedHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Accept'], // an array of additional exposed headers
      credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    },
  },
};
