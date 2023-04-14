# using node to build app
FROM node:17-alpine AS builder
# set as working directory in container
WORKDIR /app
# copy package and lock files to the working directory
COPY package.json .
COPY package-lock.json .
# install the dependencies
RUN npm install
# copy everything in current directory to working directory above
# besides what's specified in .dockerignore
COPY . .
# build with npm
RUN npm run build

# nginx image to serve app
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
# remove default nginx static resources
RUN rm -rf ./*
# copy from node image above to the current directory
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]