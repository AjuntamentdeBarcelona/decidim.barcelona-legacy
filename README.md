![decidim.barcelona logo]
(https://raw.githubusercontent.com/AjuntamentdeBarcelona/decidimbcn/master/app/assets/images/decidim-logo.png)

# decidim.barcelona

Citizen Participation and Open Government Application

[![Circle CI](https://circleci.com/gh/AjuntamentdeBarcelona/decidimbcn/tree/master.svg?style=svg)](https://circleci.com/gh/AjuntamentdeBarcelona/decidimbcn/tree/master)
[![Code Climate](https://codeclimate.com/github/AjuntamentdeBarcelona/decidimbcn/badges/gpa.svg)](https://codeclimate.com/github/AjuntamentdeBarcelona/decidimbcn)
[![Dependency Status](https://gemnasium.com/AjuntamentdeBarcelona/decidimbcn.svg)](https://gemnasium.com/AjuntamentdeBarcelona/decidimbcn)
[![Coverage Status](https://coveralls.io/repos/AjuntamentdeBarcelona/decidimbcn/badge.svg?branch=master&service=github)](https://coveralls.io/github/AjuntamentdeBarcelona/decidimbcn?branch=master)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This is the opensource code repository for "decidim.barcelona", based on [Consul](https://github.com/consul/consul), developed by the Madrid City government.

## Tech stack

The application backend is written in the [Ruby language](https://www.ruby-lang.org/) using the [Ruby on Rails](http://rubyonrails.org/) framework.

Frontend tools used include [SCSS](http://sass-lang.com/) over [Foundation](http://foundation.zurb.com/) for the styles.

## Configuration for development environment using Docker

Docker is the recommended development environment as it guarantees library parity, as well as a predictable an easy to set up development environment.

```
docker-compose build
docker-compose run --rm app db:create           
docker-compose run --rm app db:setup SEED=true
docker-compose up
```

## Configuration for development and test environments

Prerequisites: install git, ImageMagick, Ruby 2.2.3, bundler gem, redis, ghostscript and PostgreSQL (>=9.4).

```
git clone https://github.com/AjuntamentdeBarcelona/decidimbcn.git
cd decidimbcn
bundle install
cp config/database.yml.example config/database.yml
cp config/secrets.yml.example config/secrets.yml
rake db:create
bin/rake db:setup
bin/rake db:dev_seed
RAILS_ENV=test bin/rake db:setup
```

Run the app locally:
```
bin/rails s
```

Prerequisites for testing: install PhantomJS >= 2.0

Run the tests with:

```
bin/rspec
```

## Licence

Code published under AFFERO GPL v3 (see [LICENSE-AGPLv3.txt](LICENSE-AGPLv3.txt))

## Contributions

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
