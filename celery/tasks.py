from celery import Celery

app = Celery('tasks', broker='amqp://jam0929:rlawoans2@localhost/myvhost')

@app.task
def concatString(str1, str2):
    return str1 + str2
