# https-cert-proxy

Creates a proxy to your HTTP app with HTTPS, using provided certificate files. This is designed as a
convenience.

## Setup Instructions

You'll need to generate a self-signed certificiate, or one from a locally trusted CA.

### macOS

The `mkcert` package, available on Homebrew, is very easy to use.

1. Ensure you have [Homebrew](https://brew.sh) installed.
2. Run `brew install mkcert nss`. `mkcert` will create the certificate. `nss` will get Firefox to
   recognize it. (Other browsers will recognize it automatically.)
3. Run `mkcert -install` to generate your local CA.
4. Change to the directory where you'd like to save the certificates. I recommend a `/certificates`
   directory in your project.
5. Run `mkcert localhost`.
6. Ensure that the two generated files, `localhost.pem` and `localhost-key.pem`, are ignored in your
   source control. They would only be trusted on your local machine, so other users would run into
   errors.

### Other Operating Systems

Contributions welcome!

## Alternative Hostnames
It may be useful to use an alternative hostname for your project. For example, if you need to use
cookies, you may wish to serve from `localhost.YOURDOMAIN.com`. To do so, you'll need to make sure
the alternative hostname is in your `/etc/hosts` file (or equivalent). In step 5 above, replace
`localhost` with your full domain, i.e. `mkcert localhost.YOURDOMAIN.com`.

## Usage

In parallel with your development environment, run this as follows:

```shell script
npx https-cert-proxy --cert path/to/localhost.pem --key path/to/localhost-key.pem
```

By default, this will proxy your existing `http://localhost:3000` to `https://localhost:8030`. These
ports can be configured using flags. For example, this will proxy from 80 (the default HTTP port) to
443 (the default HTTPS port):

```shell script
npx https-cert-proxy --cert path/to/localhost.pem --key path/to/localhost-key.pem --source 80 --destination 443
```

I find it easiest to have these scripts in my `package.json`, using the package `concurrently`:

```json
{
  "scripts": {
    "dev": "concurrently -n w: npm:dev-*",
    "dev-web": "YOUR CURRENT DEV SCRIPT",
    "dev-ssl": "https-cert-proxy --cert path/to/localhost.pem --key path/to/localhost-key.pem"
  },
  "devDependencies": {
    "concurrently": "^5.1.0",
    "https-cert-proxy": "^0.0.1"
  }
}
```

## Configuring with environment variables

If you often run with the same settings, you can set up environment variables in addition to using
the command-line options. The variables are as follows:

| Variable          | Setting              |
|-------------------|----------------------|
| `HCP_SOURCE`      | Source port          |
| `HCP_DESTINATION` | Destination port     |
| `HCP_CERTFILE`    | The certificate file |
| `HCP_KEYFILE`     | The key file         |

If you set the `HCP_CERTFILE` and `HCP_KEYFILE` variables, you do not need to use the `--cert` and
`--key` command-line options.

## Copyright/License

Copyright (c) 2020-21 Todd Dukart. Licensed under the BSD-3-Clause.
