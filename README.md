# Elastic Search API wrapper server for Bitshares blockchain

## NodeJS Setup

```
sudo apt-get install build-essential g++ python git curl ntp htop nmon iftop nano -y
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh 2>/dev/null | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 10.21.0 >>install.log
nvm use 10.21.0 >>install.log
nvm alias default 10.21.0
npm install -g npm forever grunt-cli
```

## Install

`git clone https://github.com/technologiespro/es-api.git`

`cd es-api`

`npm install`

## Configure

`mv sample.config.json config.json`

- port - app port
- esApi - url to connection ES
- nocache - disable web cache
- allowFrom - allow from all, ip or domain ["yoursite.com","127.0.0.1"] or ["*"] - allow from all (in dev process)

## Nginx setup

`sudo apt install nginx`

`cd /etc/nginx/sites-available`

`sudo nano es-wrapper`

- insert config

```
server {
        listen 80;
        listen 443 ssl;
        server_name es-wrapper.yoursite.com;
        client_max_body_size 10M;
        location / {
        proxy_pass http://localhost:2292;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
       }
}

```

- save file: CTRL+O, CTRL+X

- for ssl install nginx certbot, instruction here https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx

* If you do not have your own DNS server, you can use https://cloudflare.com just setting up A-record

## API

Send POST requests in json format to your api https://es-wrapper.yoursite.com/api/v1/q

- Example query

```json
{
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "block_data.block_num": 19421114
                    }
                },
                {
                    "term": {
                        "operation_history.trx_in_block": 0
                    }
                }
            ]
        }
    }
}

```

- Example with axios https://github.com/technologiespro/es-api/blob/master/tests/test-q.js

- More examples https://dev.bitshares.works/en/master/supports_dev/elastic_search_plugin.html?highlight=http%3A%2F%2Flocalhost%3A9200%2F#get-operations-by-account-time-and-operation-type








