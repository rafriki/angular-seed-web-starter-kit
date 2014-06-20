#gpagespeed [![Build Status](https://travis-ci.org/zrrrzzt/gpagespeed.svg?branch=master)](https://travis-ci.org/zrrrzzt/gpagespeed)

Node.js module/CLI app for analyzing a webpage with [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v1/getting_started).

To use this you must Acquire an API key from [Google Developers Console](https://console.developers.google.com/).

The module outputs the result as string.

##Installation
```
$ npm install gpagespeed
```

or globally for the CLI app

```
$ npm install gpagespeed -g
```

##Test

Make sure you have [Mocha](http://visionmedia.github.io/mocha/) installed globally or just do an npm install in gpagespeed.

```
$ npm test
```

##Usage - Module

Pass an object with properties.

**url** and **key** are required, all other are optional.

You can see a list of all alternatives on the page for [Google PageSpeed standard query parameters](https://developers.google.com/speed/docs/insights/v1/getting_started#st_params).

```javascript
var pagespeed = require('gpagespeed')
  , opts = {
    url: 'http://url-to-check',
    key: 'insert-your-key'
  };

pagespeed(opts, function(err, data){
  if(err) throw err;

  console.log(data);
});
```

##Usage - CLI

```
$ gpagespeed <url> --key=<key>
```

Optional params. You can see a list of all alternatives on the page for [Google PageSpeed standard query parameters](https://developers.google.com/speed/docs/insights/v1/getting_started#st_params).

```
$ gpagespeed <url> --key=<key> --callback=<callback> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile>
```

##License
MIT