#############
### build ###
#############

# Base image
FROM node:12.4.0 as build

# Expected build arguments
ARG GIT_HASH
ARG NG_BUILD_CONFIG

# Install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -yq --no-install-recommends google-chrome-stable curl vim

# Set working directory
WORKDIR /app

# Add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc
RUN npm install

# Add app code

COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json
COPY ./angular.json /app/angular.json

# Insert Git Hash value
RUN sed -i "s/GIT_HASH_PLACEHOLDER/${GIT_HASH}/g" /app/src/environments/*

# Run tests
# RUN ng test --watch=false
# RUN ng e2e --port 4200

# Generate build
RUN ng build --output-path=dist ${NG_BUILD_CONFIG} && gzipper --verbose /app/dist



###############
### package ###
###############

# Base image
FROM nginx:1.16.0-alpine

# Copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/conf /etc/nginx
# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
