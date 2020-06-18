const axios = require('axios')

let qu = {
    "query" : {
        "bool" : { "must" : [{"term": { "account_history.account.keyword": "1.2.1003283"}}, {"range": {"block_data.block_time": {"gte": "2019-10-26T00:00:00", "lte": "2019-10-29T23:59:59"}}}] }
    }
}

axios.post('http://localhost:2292/api/v1/q', qu).then(function(data){
    console.log(data.data)
})