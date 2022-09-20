# btc-info

### This project is a ReactJS client to [BTC Server](https://github.com/fshsweden/btc-server).

## How to use

#### Development env

* Make sure the BTC Server is running locally
* Update the .env.development file with the URL of the backend
* run the react app locally with `npm run start`

#### Production environment

* update the .env.production with the URL of the backend
* build the production code with `npm run build`
* copy everything under `./build` to the webserver
* look in [configuration example](apache-client-configuration-example.conf) for an example on how to setup the client under Apache.
