#!/bin/bash

docker --debug build -t registry.gilmariosoftware.com.br/anotacoes:latest .

docker push registry.gilmariosoftware.com.br/anotacoes:latest