FROM node:18 AS build
WORKDIR /app
COPY ./package.json .
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html