FROM nginx:latest
WORKDIR /etc/nginx
COPY . .
RUN openssl req -x509 -newkey rsa:2048 -keyout chave.pem \
-out cert.pem -days 365 -nodes -config openssl-san.cnf