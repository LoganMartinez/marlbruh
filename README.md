# marlbruh docker

you will need npm.

to build docker container:
* preferred: ```make```
* or:
    - ```git submodule update --remote```
    - ```mkdir build && cd build```
    - ```cp -R ../src .```
    - ```cd src/frontend-marlbruh; npm install; npm run build; mv dist ../..```
    - ```cd ../.. && mv src/backend-marlbruh . && rm -rf src && cd ..```
    - ```docker build -t marlbruh .```

running:
* ```docker run -p 0.0.0.0:8100:8100 -e DATA_PATH=/data/ -v /home/marigold/src/marlbruh-docker/data:/data --name marlbruh marlbruh```
* or just: ```docker compose up -d```

## todo:
* ~~decrease size of image~~
* ~~run frontend with discrete webserver~~