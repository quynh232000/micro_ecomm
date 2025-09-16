FROM php:8.2-fpm
WORKDIR /var/www/html
RUN docker-php-ext-install pdo pdo_mysql
COPY composer.json composer.lock ./
RUN composer install
COPY . .
EXPOSE 5003
CMD ["php-fpm"]
