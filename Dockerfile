
# Base Image
FROM nginx:alpine

# Set working directory
WORKDIR /app

# Copy project files
RUN rm -v /usr/share/nginx/html/index.html
COPY ./www /usr/share/nginx/html
COPY ./www/index.html /usr/share/nginx/html/indexv1.html
COPY ./nginx_custom/nginx-custom-server.conf /etc/nginx/conf.d/default.conf
COPY ./nginx_custom/nginx-custom-conf.conf /etc/nginx/nginx.conf

# expose port and define CMD
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
