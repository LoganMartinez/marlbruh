# syntax=docker/dockerfile:1
   
FROM node:20-alpine

VOLUME /data
WORKDIR /app

COPY src ./
COPY run_all.sh ./

RUN apk add python3 py3-pip && python3 -m pip install -r backend-marlbruh/requirements.txt
RUN cd frontend-marlbruh && npm install

CMD ["/bin/sh", "run_all.sh"]

EXPOSE 8100
