const dev = {
  apiUrl: 'http://localhost:57153/',
  auth: {
    clientId: 'BodyCompClient',
    clientRoot: 'http://localhost:3000/',
  },
};
const prod = {
  apiUrl: 'http://localhost:57153/',
  auth: {
    clientId: 'BodyCompClient',
    clientRoot: 'http://localhost:3000/',
  },
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
