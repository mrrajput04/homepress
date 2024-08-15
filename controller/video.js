const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const {videoSchema, uploadService, getService, deleteService} = require('../services');



//video uploading on bunny.net storage
const uploadvideo = async (req, res, next) => {
   try{
  const data =  await uploadService(req.file)
 const  date = data.headers.date;
   await videoSchema({...req.body, ...res.locals, videoUrl:data.config.url, date:date});
     res.status(200).send('File uploaded successfully');
   }
   catch (error) {
    res.status(400).json({message:error.message})
  }
};

//deleting video from storage of bunny.net
const deleteVideo = async (req, res) => {
  let filename = req.query.filename;
    let zoneName = req.query.zoneName;
  try {
    await deleteService(filename, zoneName)
    res.status(200).send('File deleted successfully');
  } catch (error) {
    const {data, status} = error.response;
    res.status(status).json({error:data});
  }
};

//getting all video from a specific storage zone
const getVideo = async (req, res, next) => {
  try {
  const response =  await getService();
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  uploadvideo,
  deleteVideo,
  getVideo,
};
