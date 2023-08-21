#!/bin/sh

python3 src/backend-marlbruh/manage.py migrate
python3 src/backend-marlbruh/manage.py runserver &

cd src/frontend-marlbruh && npm run dev