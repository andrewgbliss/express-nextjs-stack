FROM nginx

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf
RUN rm -vRf /etc/nginx/conf.d

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/
ADD ./conf.d /etc/nginx/conf.d

# Append "daemon off;" to the configuration file
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute
# when creating a new container
CMD service nginx start
