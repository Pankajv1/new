const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');
var fs = require('fs');
   
    const storage = multer.diskStorage({
       
            destination: function (req, file, cb) {
                var currentyear   = new Date().getFullYear();
            var currentmonth   = new Date().getMonth() + 1;
            if(!fs.existsSync(path.join(__dirname,'../../uploads/'+currentyear)))
            {
                
                fs.mkdirSync(path.join(__dirname,'../../uploads/'+currentyear));
            }
            if(!fs.existsSync(path.join(__dirname,'../../uploads/'+currentyear+'/'+currentmonth)))
            {
                
                fs.mkdirSync(path.join(__dirname,'../../uploads/'+currentyear+'/'+currentmonth));
            }
            cb(null, './uploads/'+currentyear+'/'+currentmonth);
        },
        filename: function (req, file, cb) {
            

            const serviceimage = new Date().getTime() + file.originalname;
        
            cb(null,  serviceimage);
        }
       
    });
    
    const uploadImg = multer({storage: storage}).single('file');


router.post('/upload',uploadImg,async(req,res)=>{
    try
    {
        
        console.log(`${req.file.path} `);
        res.send(`${req.file.path}`);
         
      
    }
    catch(err)
    {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }
   
})   



module.exports = router;   