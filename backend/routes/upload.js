
let uploads = require('../models/upload');
const router = require('express').Router();
var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
uuidv4 = require('uuid/v4');

//router.route(express.static(path.join(__dirname, "./public/")));

// using find() method is from mangoos and return data in json
router.route('/').get((req, res) => {
  uploads.find()

    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});



const DIR = './public/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
   
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'text/plain' || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .txt , .pdf , .png, .jpg and .jpeg   format allowed!'));
        }
    }
});
//var file_uploaded_name =  upload.fileFilter.filename ;



router.route('/uploadFile').post(upload.single('profileImg'), (req, res, next) => {

   
    const url = req.protocol + '://' + req.get('host');
    const upload_info = new uploads({
        description : req.body.description ,
        category_name : req.body.category_name  ,
      _id: new mongoose.Types.ObjectId(),
     //   name: req.body.name,
        profileImg: url + '/public/uploads' + req.file
      // profileImg : req.body.profileImg
       // profileImg: url + '/public/' + req.file.filename
    });
    upload_info.save().then(result => {
        res.status(201).json({
            message: "Uploaded successfully!",
            userCreated: {
              //  _id: result._id,
                profileImg: result.profileImg
            }
        });
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
})



router.route("/list_upload_info").get((req, res, next) => {
    uploads.find().then(data => {
        res.status(200).json({
            message: " list retrieved successfully!",
            users: data
        });
       
    });
});

// id = 5eebed3cb6fabe26d027696f
 
router.get('/:id/download', function (req, res, next) {

 //res.download(filePath ,fileName  )

//var downloaded_file=  res.download(DIR, file_uploaded_name)
 

    // uploads.findById(req.params.id),(err,data)=>{ 
    //     if(err){  
    //         console.log(err) 
    //         res.status(500).json({
    //                          error: err
    //                      }); 
    //     }   
    //     else{  
    //         var path=DIR+data[0].picspath;  
    //     var file_path =   res.download(path); 
    //        res.status(500).json({
    //         data : file_path
    //     });
            
    //     }  
    // }



        res.status(201).json({
            message: "downloaded successfully!",
          //  download_file: downloaded_file
        });
    if(err){
        console.log(err),
            res.status(500).json({
                error: err
            });
    }  
 });


module.exports = router;

