# syntax=docker/dockerfile:1
   
FROM node:20-alpine

VOLUME /data
WORKDIR /app

COPY src ./
COPY run_all.sh ./

RUN \
    apk add python3 py3-pip caddy && \
    python3 -m pip install -r backend-marlbruh/requirements.txt && \
    cd /app/frontend-marlbruh && \
    npm install && \
    npm run build && \
    rm -rf node_modules

COPY Caddyfile ./frontend-marlbruh/dist/

CMD ["/bin/sh", "run_all.sh"]

EXPOSE 8100
