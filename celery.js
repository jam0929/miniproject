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
      var result = client.call('tasks.concatString', [str1, str2]);

      result.on('ready', function(data) {
        console.log(data);
        return data.result;
      });
    });
  }
};