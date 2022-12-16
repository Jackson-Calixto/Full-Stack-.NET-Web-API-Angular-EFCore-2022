openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf
openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt
openssl verify -CAfile localhost.crt localhost.crt
