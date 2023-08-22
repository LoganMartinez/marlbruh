#!/bin/sh

python3 /app/backend-marlbruh/manage.py migrate
cd /app/backend-marlbruh && gunicorn marlbruh.wsgi &

cd /app/frontend-marlbruh && npm run dev