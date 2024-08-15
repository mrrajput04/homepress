const config = require('../config');
const axios = require('axios');
const fs = require('fs');


async function deleteService(filename, zoneName) {
    if (!(filename && zoneName)) {
        throw new Error('filename or zoneName not found');
      }
    const url = `https://ny.storage.bunnycdn.com/${zoneName}/${filename}`;
    const options = {
      method: 'DELETE',
      headers: {
        Accesskey: config.API_KEY,
      },
    };
    const response = await axios.delete(url, options);
    return response;
}

module.exports = deleteService;