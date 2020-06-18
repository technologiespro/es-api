'use strict'
const { Client } = require('@elastic/elasticsearch')
const jsonFile = require('jsonfile')
const CONFIG = jsonFile.readFileSync('../config.json')
const client = new Client({ node: CONFIG.esApi })
async function run () {

    // Let's search!
    const { body } = await client.search({
        index: CONFIG.index,
        body: {
            "query" : {
                "bool" : { "must" : [{"term": { "account_history.account.keyword": "1.2.282"}}, {"range": {"block_data.block_time": {"gte": "2015-10-26T00:00:00", "lte": "2015-10-29T23:59:59"}}}] }
            }
        }
    })
    console.log(body.hits.hits)
}
run().catch(console.log)