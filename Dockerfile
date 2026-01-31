FROM php:8.2-apache

# Install PostgreSQL PDO extension
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Copy public files to web root
COPY public/ /var/www/html/

# Set working directory
WORKDIR /var/www/html

# Adjust permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 80
