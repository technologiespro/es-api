# Elastic Search API wrapper server for Bitshares blockchain

## Install

`git clone https://github.com/technologiespro/es-api.git`

`cd es-api`

`npm install`

## Configure

`mv sample.config.json config.json`

- port - app port
- esApi - url to connection ES

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

Example query

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

Example with axios

`npm install axios`







