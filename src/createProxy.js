const httpProxy = require('http-proxy');
const fs = require('fs');

const createProxy = ({
  source,
  destination,
  cert,
  key,
}) => httpProxy.createServer({
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

module.exports = createProxy;
