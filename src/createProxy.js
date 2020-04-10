const httpProxy = require('http-proxy');
const fs = require('fs');

const createProxy = ({
  source,
  destination,
  cert,
  key,
}) => new Promise((resolve) => {
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

  resolve();
})

module.exports = createProxy;
