cd $env:USERPROFILE\.cloudflared
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out cert.crt
openssl x509 -in cert.crt -out cert.pem