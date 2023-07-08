#!/bin/bash

# Actualizar la rama local "ServerBranch" con la última versión de la rama "main" en el repositorio remoto
git fetch origin main
git reset --hard origin/main

# Actualizar la rama "ServerBranch" en el repositorio Cloud
git pull origin ServerBranch

]# Actualizar la rama "ServerBranch" en el repositorio remoto
git push origin ServerBranch
