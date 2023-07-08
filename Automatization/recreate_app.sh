#!/bin/bash

docker-compose stop app
docker-compose rm -f app
docker rmi adminapp-app
docker-compose build app
docker-compose up -d app
