const dev = {
  host: 'localhost',
  port: 57153,
};
const prod = {
  host: 'localhost',
  port: 57153,
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
