#!/bin/bash
docker run --rm -d --network local \
    -p 80:80 \
    -v ./nginx.conf:/etc/nginx/nginx.conf \
    registry.gilmariosoftware.com.br/anotacoes:latest
