# marlbruh docker

to build docker container:
* preferred: ```make```
* or:
    - ```git submodule update --remote```
    - ```docker build -t marlbruh .```

running:
* ```docker run -p 0.0.0.0:8100:8100 -e DATA_PATH=/data/ -v /home/marigold/src/marlbruh-docker/data:/data --name marlbruh marlbruh```
* or just: ```docker compose up -d```

## todo:
* decrease size of image
* run frontend with discrete webserver