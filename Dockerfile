FROM ultrayoshi/ruby-node-phantomjs
MAINTAINER david@adverway.com

# Install dependencies
RUN apt-get update && \
    apt-get install -y libpq-dev ghostscript espeak lame && \
    rm -rf /var/lib/apt/lists*

# Create working directory
ENV APP_HOME /decidimbcn
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Add source code
ADD . $APP_HOME

# Run rails server by default
CMD ["bundle" "exec" "puma", "-C config/puma.rb"]
