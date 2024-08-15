const config = require('../config');
const axios = require('axios');
const fs = require('fs');

async function getService() {
    
    const apiUrl = `https://ny.storage.bunnycdn.com/${config.STORAGEZONE1}/`;
    console.log(apiUrl);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Accesskey: config.API_KEY,
      },
    };

    const response = await axios.get(apiUrl, options);
    console.log(response.status);
    return response;
}

module.exports = getService;