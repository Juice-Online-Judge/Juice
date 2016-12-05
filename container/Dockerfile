FROM richarvey/nginx-php-fpm:php7

MAINTAINER DanSnow

ENV GIT_REPO https://github.com/Sunday-Without-God/Juice.git
ENV WEBROOT /var/www/html/public
ENV RUN_SCRIPTS 1
RUN mkdir -p /conf && \
    ln -s /usr/bin/php7 /usr/bin/php && \
    composer self-update && \
    composer global require 'hirak/prestissimo:^0.3'
VOLUME ["/conf"]

CMD ["/start.sh"]
