const router = require('express').Router();
const videoController = require('../controller/video')
const  userController = require('../controller/users')
const userValidation = require('../middlerware/middleware')
const isAuthenticated = require('../auth/authentication')

//importing multer middleware
const uploadVideo = require('../middlerware/multer');

router.get('/getvideo',isAuthenticated,videoController.getVideo)
router.post('/videoupload',isAuthenticated,uploadVideo,videoController.uploadvideo)
router.delete('/deletevideo',isAuthenticated,videoController.deleteVideo)

router.post('/register',userValidation,userController.create);
router.post('/login',userController.login);




module.exports = router