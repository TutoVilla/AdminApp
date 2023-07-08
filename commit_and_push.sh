#!/bin/bash

git add .

read -p "Ingrese el mensaje del commit: " commit_message
git commit -m "$commit_message"

git push origin tutovilla
