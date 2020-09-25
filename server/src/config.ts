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
};
