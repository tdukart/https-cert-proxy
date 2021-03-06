#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const isEmpty = require('lodash.isempty');
const createProxy = require('./createProxy');

const optionDefinitions = [
  {
    name: 'source',
    alias: 's',
    type: Number,
    defaultValue: process.env.HCP_SOURCE || 3000,
    description: 'The port your local project is listening on. For Node development, this is likely 3000.',
  },
  {
    name: 'destination',
    alias: 'd',
    type: Number,
    defaultValue: process.env.HCP_DESTINATION || 8030,
    description: 'The port to proxy from.',
  },
  {
    name: 'cert',
    alias: 'c',
    type: String,
    defaultValue: process.env.HCP_CERTFILE,
    description: 'The certificate file to use.',
  },
  {
    name: 'key',
    alias: 'k',
    type: String,
    defaultValue: process.env.HCP_KEYFILE,
    description: 'The certificate key file to use.',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Displays this help.',
  },
];

const usage = commandLineUsage([
  {
    header: 'https-cert-proxy',
    content: 'Creates a simple HTTPS-to-HTTP proxy for local development, using provided certificate files.',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
  {
    header: 'Usage Instructions',
    content: 'For full usage instructions, visit {underline https://npm.im/https-cert-proxy}.',
  },
]);

const checkOptions = () => {
  const options = commandLineArgs(optionDefinitions);
  if (!options || isEmpty(options)) {
    return false;
  }

  if (options.help) {
    return false;
  }

  if (!options.cert || !options.key) {
    return false;
  }

  return options;
};

const parsedOptions = checkOptions();

if (!parsedOptions) {
  console.log(usage);
} else {
  createProxy(parsedOptions).then(({ altNames }) => {
    const hostname = (Array.isArray(altNames)) ? altNames[0] : 'localhost';
    console.log(`Listening to localhost:${parsedOptions.source}`);
    console.log(`Using certificate file ${parsedOptions.cert} and key file ${parsedOptions.key}`);
    console.log(`Proxy server started at https://${hostname}:${parsedOptions.destination}`);
  });
}
