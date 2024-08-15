const config = require('../config');
const axios = require('axios');
const fs = require('fs');

async function uploadService(files) {
  if (!files) {
    throw new Error('file not found');
  }
  const file = fs.createReadStream(files.path);
  const url =
    `https://ny.storage.bunnycdn.com/${config.STORAGEZONE1}/` +
    files.originalname;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': files.mimetype,
      'Content-Length': files.size,
      Accesskey: config.API_KEY,
    },
  };
  const response = await axios.put(url, file, options);
  console.log(`statusCode: ${response.status}`);
  return response;
}

module.exports = uploadService;
