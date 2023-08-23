# syntax=docker/dockerfile:1
   
FROM alpine:latest

VOLUME /data
WORKDIR /app

COPY build ./
COPY run_all.sh ./

RUN \
    apk add --no-cache python3 py3-pip caddy && \
    python3 -m pip install -r backend-marlbruh/requirements.txt

COPY Caddyfile ./dist/

CMD ["/bin/sh", "run_all.sh"]

EXPOSE 8100
