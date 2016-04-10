var celery = require('node-celery');
var config = require('./config/config');

var client = celery.createClient({
  CELERY_BROKER_URL: config.celeryBrokerUrl,
  CELERY_RESULT_BACKEND: config.celeryResultBackend
});

module.exports = {
  concatString: function(str1, str2) {
    //node-celery
    client.on('error', function(err) {
        console.log(err);
    });

    client.on('connect', function() {
        client.call('tasks.concatString', [str1, str2], function(result) {
          console.log("hello world");
          console.log(result);
          client.end();
        });
    });
  }
};