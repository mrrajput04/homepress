const { getDatabase, ref, set } = require('firebase/database');
const {  v4:uuidv4 } = require('uuid');

async function videoSchema ({title, description, name, uid, thumbnailUrl , videoUrl, views, date, duration, reported}) {
    const db = getDatabase();
      set(ref(db, 'video/' + uuidv4()), {
        title: title,
        description: description,
        author: name,
        userID: uid,
        thumbnailUrl: thumbnailUrl,
        videoUrl: videoUrl,
        views: views,
        date: date,
        duration : duration,
        reported: reported,
      });
      return true
}

module.exports = videoSchema;