export const config = {
  host: 'localhost',
  port: 57153,
  connectionString: 'Provider=MSOLEDBSQL;Server=(localdb)\\MSSQLLocalDB;Database=BodyComp;Trusted_Connection=yes;',
  routes: {
    cors: {
      origin: ['http://localhost:3000'], // an array of origins or 'ignore'
      maxAge: 60,
      credentials: true, // boolean - 'Access-Control-Allow-Credentials'
    },
  },
};
