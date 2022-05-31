# btc-info

This project is a ReactJS client to https://github.com/fshsweden/py-ccxt-backend.

## How to use

#### Development env

* Make sure the py-ccxt-backend is running
* Update the .env.development file with the URL of the backend
* run the react app locally with `npm run start`

#### Production environment

* update the .env.production with the URL of the backend
* build the production code with `npm run build`
* copy everything under `./build` to the webserver
