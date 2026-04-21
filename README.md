This project is no longer supported. See below for an alternative using Caddy.

# Alternative

To create a proxy to an HTTP app for HTTPS for local development, use Caddy.

## Setting Up Caddy

1. Install Caddy according to the instructions on [caddyserver.com](https://caddyserver.com/)
2. Run `sudo caddy trust` to install a local certificate authority. This will allow Caddy to create a self-signed certificate.
3. For your project, create a `caddyfile` as below, replacing the `:80` with the port your server is running on (often `:3000` or `:8000`)

```caddyfile
{
  http_port 8090
}
https://localhost {
    tls internal

    reverse_proxy localhost:80
}
```

4. To start the proxy, run `caddy run` in the directory where the `caddyfile` lives. You can also adjust hostnames by changing `https://localhost` at the top to whatever hostname you'd like.

Caddy likes to run its own non-secured HTTP server at port 80. The `http_port` command above pushes that non-secured server to another port.
