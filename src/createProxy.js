const httpProxy = require('http-proxy');
const x509 = require('x509');
const fs = require('fs');

const createProxy = ({
  source,
  destination,
  cert,
  key,
}) => new Promise((resolve) => {
  const altNames = x509.getAltNames(cert);
  httpProxy.createServer({
    target: {
      host: 'localhost',
      port: source,
    },
    ws: true,
    ssl: {
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    },
  }).listen(destination);

  resolve({ altNames });
});

module.exports = createProxy;
