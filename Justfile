# vim : set filetype=bash :

install:
  npm install -g prettier;

build-client:
  cd client; yarn install;

run-client:
  cd client; yarn start;

format-client:
  cd client; prettier --write "**/*";

# Use to view charts with mock server
demo-client-charts:
  just build-client; just run-client;

