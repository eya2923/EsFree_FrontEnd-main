# Stage 1: Compile and Build Angular codebase
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Generate the build of the application
RUN ng build --configuration production

# Stage 2: Serve app with Nginx server
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY --from=build /usr/local/app/dist/virtiverse-front-end /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
