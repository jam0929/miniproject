# miniproject for solidware

node server command - forever bin/www
celery broker - rabbitmq
celery worker 
 path - /celery
 command - celery -A tasks worker --loglevel=info
