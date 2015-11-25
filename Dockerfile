FROM nginx:1.9.6
RUN mkdir -p /var/www/xkcd && chown nginx /var/www/xkcd
ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD static/* /var/www/xkcd/