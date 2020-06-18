const express = require('express');
const router = express.Router();
const axios = require('axios')
const jsonFile = require('jsonfile')
const CONFIG = jsonFile.readFileSync('./config.json')

/* GET home page. */
router.post('/v1/q', async function (req, res, next) {
    let result = null
    try {
        result = (await axios.get(
            CONFIG.esApi,
            req.body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })).data
    } catch (e) {

    }
    await res.json(result)
});

module.exports = router;
