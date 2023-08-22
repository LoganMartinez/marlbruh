# syntax=docker/dockerfile:1
   
FROM node:20-alpine
VOLUME /db
WORKDIR /app
COPY . .
RUN apk add python3 py3-pip && python3 -m pip install -r src/backend-marlbruh/requirements.txt
RUN cd src/frontend-marlbruh && npm install
CMD ["/bin/sh", "run_all.sh"]
EXPOSE 8100
