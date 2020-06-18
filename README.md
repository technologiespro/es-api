# Elastic Search API wrapper server for Bitshares blockchain

Ubuntu

## Create a user if necessary

```
sudo apt-get update && sudo apt-get dist-upgrade -y
adduser yourusername
usermod -a -G sudo yourusername
cd /home/yourusername
su yourusername
```

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

## Install ES Wrapper Server

`git clone https://github.com/technologiespro/es-api.git`

`cd es-api`

`npm install`

## Configure

`mv sample.config.json config.json`

- port - app port
- esApi - url to connection ES
- nocache - disable web cache
- allowFrom - allow from ip ["127.0.0.1"] or [] - allow from all

## Start server

- for run es wrapper server `sh restart.sh` after start available on http://your-server-ip:2292/api/v1/q
- for stop server `sh stop.sh`
- for logs view `forever list` > logfile > `tail -f /home/yourUser/.forever/xXXXX.log`

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
        client_max_body_size 2M;
        location / {
        proxy_pass http://localhost:2292;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
       }
}

```

- save file: CTRL+O, CTRL+X
- `sudo ln -s /etc/nginx/sites-available/es-wrapper /etc/nginx/sites-enabled/es-wrapper`
- `sudo nginx -t`
- `sudo service nginx restart`
- for ssl install nginx certbot, instruction here https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx
- *If you do not have your own DNS server, you can use https://cloudflare.com just setting up A-record

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


### Curl test

```
curl -X POST 'https://es-wrapper.yoursite.com/api/v1/q' -H 'Content-Type: application/json' -d '
{
        "query" : {
                "bool" : { "must" : [{"term": { "account_history.account.keyword": "1.2.282"}}, {"range": {"block_data.block_time": {"gte": "2015-10-26T00:00:00", "lte": "2015-10-29T23:59:59"}}}] }
        }
}
'
```

- Example with axios https://github.com/technologiespro/es-api/blob/master/tests/test-q.js

- More examples https://dev.bitshares.works/en/master/supports_dev/elastic_search_plugin.html#get-operations-by-account-time-and-operation-type








