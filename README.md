# angular-seed-web-starter-kit

A child of:
[Web Starter Kit](http://developers.google.com/web/starter-kit) & [Angular Seed](https://github.com/angular/angular-seed)

This project is currently using Web Starter Kit v0.4.0

A rudimentary deployment system for Heroku is included.  At the moment, these deployments will only serve out of the ./app folder, not the ./dist folder.  As such (and a litany of other reasons) you should not use this in production.


### To use:

	git clone https://github.com/rafriki/angular-seed-web-starter-kit.git

	cd angular-seed-web-starter-kit

	# Install dependencies
	npm install

	# Build project
	gulp

#### To build:

	gulp

#### To start server:

	gulp serve

### To deploy to Heroku:

Assuming you're all commited, you have a Heroku account and have the [Heroku Toolbox](https://toolbelt.heroku.com/).  Start with `gulp` if you haven't run that or `gulp serve` already.

	heroku create
	git push heroku master
	heroku ps:scale web=1

Easy.