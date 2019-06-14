#############
### build ###
#############

# Base image
FROM node:12.4.0 as build

ARG ENVIRONMENT
ARG GIT_HASH

# Install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# Add app code
COPY . /app

# Run tests
# RUN ng test --watch=false
# RUN ng e2e --port 4200

RUN sed -i "s/GIT_HASH_PLACEHOLDER/${GIT_HASH}/g" /app/src/environments/environment.ts
RUN sed -i "s/GIT_HASH_PLACEHOLDER/${GIT_HASH}/g" /app/src/environments/environment.${ENVIRONMENT}.ts

# generate build
RUN ng build --configuration=${ENVIRONMENT} --output-path=dist



###############
### package ###
###############

# Base image
FROM nginx:1.16.0-alpine

# Copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
