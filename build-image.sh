#!/bin/bash

docker --debug build -t registry.gilmariosoftware.com.br/anotacoes:latest .

docker push registry.gilmariosoftware.com.br/anotacoes:latest

kubectl rollout restart -n pessoal deployment anotacoes-deployment