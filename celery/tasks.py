from celery import Celery

app = Celery(
  'tasks',
  backend='amqp',
  broker='amqp://jam0929:rlawoans2@localhost/myvhost'
)

app.conf.update(
  CELERY_TASK_SERIALIZER = 'json',
  CELERY_ACCEPT_CONTENT = ['json'],
  CELERY_RESULT_SERIALIZER = 'json'
)

@app.task
def concatString(str1, str2):
    return str1 + str2
