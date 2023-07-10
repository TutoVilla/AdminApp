#!/bin/bash

docker-compose stop app
docker-compose rm -f app
docker rmi adminapp_app
docker rmi adminapp-app
read -t 5 -p "Do you want to perform system prune? (Y/n): " response
response=${response:-Y}  # Si no se proporciona ninguna respuesta, se establece el valor predeterminado en "Y"

if [[ $response =~ ^[Yy]$ ]]; then
    docker system prune --all --volumes --force
fi

docker-compose build app
docker-compose up -d app
