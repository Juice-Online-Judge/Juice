FROM richarvey/nginx-php-fpm:php7

MAINTAINER DanSnow

ENV GIT_REPO https://github.com/Sunday-Without-God/Juice.git
ENV RUN_SCRIPTS 1
RUN mkdir -p /conf && \
    apk add mysql-client && \
    ln -s /usr/bin/php7 /usr/bin/php && \
    composer self-update && \
    composer global require 'hirak/prestissimo:^0.3'

ADD conf/nginx.conf /etc/nginx/nginx.conf
ADD conf/nginx-site.conf /etc/nginx/sites-available/default.conf

VOLUME ["/conf"]

CMD ["/start.sh"]
