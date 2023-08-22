#!/bin/sh

python3 src/backend-marlbruh/manage.py migrate
cd /app/src/backend-marlbruh && gunicorn marlbruh.wsgi &

cd /app/src/frontend-marlbruh && npm run dev