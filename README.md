# marlbruh docker

to compile as docker container:
* docker build -t marlbruh .

running:
* docker run -p 0.0.0.0:8100:8100 -e BACKEND_DB_PATH=/db/ -v /home/marigold/src/marlbruh-docker/db:/db --name marlbruh marlbruh

## todo:
* decrease size of image