FROM node:20 AS build
WORKDIR /app
COPY . .
COPY gameshop.key /etc/ssl/private/
COPY gameshop.pem /etc/ssl/certs/
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off"]