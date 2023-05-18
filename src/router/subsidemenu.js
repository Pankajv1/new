const express = require('express');
const router = new express.Router();
const subsidemenu = require('../modals/subsidemenu');
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');

// enable CORS
router.use(cors());
// parse application/json
router.use(bodyParser.json());
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
// serving static files




router.post('/add_subsidemenu', async (req, res) => {
    try {

        if (req.body.name != "" && req.body.link != "" && req.body.toltip != "" && req.body.level != "" && req.body.type != "" && req.body.sidemenuID !="") {
            if (req.body.type == "icon") {
                if (req.body.icon != "") {
                    var data = {
                        name: req.body.name,
                        link: req.body.link,
                        toltip: req.body.toltip,
                        level: req.body.level,
                        type: req.body.type,
                        menuimage: req.body.icon,
                        sidemenuID:req.body.sidemenuID

                    }
                }
                else {
                    console.log(`Please Enter Icon Name`
                    );
                    res.send(`Please Enter Icon Nam`);

                }


            }
            else {
                if (req.body.menuimage != undefined) {
                    var data = {
                        name: req.body.name,
                        link: req.body.link,
                        toltip: req.body.toltip,
                        level: req.body.level,
                        type: req.body.type,
                        menuimage: req.body.menuimage,
                        sidemenuID:req.body.sidemenuID

                    }
                }
                else {
                    console.log(`Please Upload Image`
                    );
                    res.send(`Please Upload Image`);

                }

            }

            const subsidemenusave = new subsidemenu(data);
            const subsidemenuresult = await subsidemenusave.save();
            console.log(`${subsidemenuresult}`);
            res.send(`${subsidemenuresult}`);
        }
        else {
            console.log(`All field is requireed`
            );
            res.send(`All field is requireed`);


        }

    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }

})
router.delete('/delete_subsidemenu/:id', async (req, res) => {
    try {
        const subsidemenuID = await req.params.id;
        subsidemenu.findByIdAndRemove({ _id: subsidemenuID}, (err, doc) => {
            if (!err) {
                console.log('success');
                res.send('success');
            } else {
                console.log('Failed to Delete user Details: ' + err);
                res.send('Failed to Delete user Details: ' + err);
            }
        });


    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }

})
router.patch('/update_subsidemenu/:id', async (req, res) => {
    try {
        if (req.body.name != "" && req.body.link != "" && req.body.toltip != "" && req.body.level != "" && req.body.type != "") {
            if (req.body.type == "icon") {
                if (req.body.icon != "") {
                    var data = {
                        name: req.body.name,
                        link: req.body.link,
                        toltip: req.body.toltip,
                        level: req.body.level,
                        type: req.body.type,
                        menuimage: req.body.icon,
                        sidemenuID:req.body.sidemenuID

                    }
                }
                else {
                    console.log(`Please Enter Icon Name`
                    );
                    res.send(`Please Enter Icon Nam`);

                }


            }
            else {
                if (req.body.menuimage != undefined) {
                    var data = {
                        name: req.body.name,
                        link: req.body.link,
                        toltip: req.body.toltip,
                        level: req.body.level,
                        type: req.body.type,
                        menuimage: req.body.menuimage,
                        sidemenuID:req.body.sidemenuID

                    }
                }
                else {
                    console.log(`Please Upload Image`
                    );
                    res.send(`Please Upload Image`);

                }

            }
            const sub_sidemenuID = await req.params.id;
            const result = await subsidemenu.findByIdAndUpdate({ _id: sub_sidemenuID }, data, { new: true });
            if(result != null)
            {
                res.send(result);
            }                                                                                 
            else{
                res.send('something went wrong');
            }
        }
        else {
            console.log(`All field is requireed`
            );
            res.send(`All field is requireed`);


        }

    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }



})

router.get('/all_subsidemenu',async(req,res)=>{

    try {

       
        const result = await subsidemenu.find().populate('sidemenuID');

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
router.get('/get_allsubsidemenu/:id',async(req,res)=>{

    try {
        
        const subsidemenu = await req.params.id;
        const result = await subsidemenu.find({sidemenuID:subsidemenu}).populate('sidemenu');

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
router.get('/get_single_sub_sidemenu/:id',async(req,res)=>{

    try {

        const subsidemenuID = await req.params.id;
        const result = await subsidemenu.find({_id:subsidemenuID}).populate('sidemenu');

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
module.exports = router;   
