var request = require('request')
  , validUrl = require('valid-url')
  , pagespeedUrl = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed'
  ;

module.exports = function(opts, callback){

  if(!opts.key && !opts.nokey){
    return callback(new Error('Missing required param: key'), null);
  }

  if(!opts.url){
    return callback(new Error('Missing required param: url'), null);
  }

  if(opts.url && !validUrl.isWebUri(opts.url)){
    return callback(new Error('Invalid url'), null);
  }

  request(pagespeedUrl,{qs:opts}, function(error, res, body){
    if(error){
      return callback(error, null);
    }
    return callback(null, body.toString());
  });
};