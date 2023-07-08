#!/bin/bash

# Actualizar la rama local "ServerBranch" con la última versión de la rama "main" en el repositorio remoto
git fetch origin main
git reset --hard origin/main

# Actualizar la rama "ServerBranch" en el repositorio remoto
git pull origin ServerBranch
