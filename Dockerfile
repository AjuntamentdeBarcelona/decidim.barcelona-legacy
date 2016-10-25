FROM codegram/ruby-node-phantomjs
MAINTAINER david.morcillo@codegram.com

RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y \
  yarn

# Create working directory
ENV APP_HOME /decidim.barcelona
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Add source code
ADD . $APP_HOME

# Install webpack
RUN yarn global add webpack

# Run rails server by default
CMD ["bundle" "exec" "puma", "-C config/puma.rb"]
