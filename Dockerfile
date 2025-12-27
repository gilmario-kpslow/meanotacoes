FROM node:22.19-alpine AS compile
RUN npm i -g pnpm
WORKDIR /app
COPY . /app
ENV CI=true
RUN pnpm i
RUN pnpm run build

FROM docker.io/nginx:alpine
ENV LANGUAGE='pt_BR:pt'
COPY --from=compile /app/dist/anotacoes/browser /usr/share/nginx/html
EXPOSE 80
