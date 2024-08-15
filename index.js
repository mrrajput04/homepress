const express = require('express');
const config = require('./config');
const videoRoutes = require('./routes/video')
const app = express();

//middlerware
app.use(express.json());


//routes
app.use('/api',videoRoutes)



//server running
app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}/`);
})