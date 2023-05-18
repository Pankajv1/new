const express = require('express');
const router = new express.Router();
const subservicemodel = require('../modals/subservice');
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


router.post('/add_subservice', async (req, res) => {
    try {

        if (req.body.title != "" && req.body.servicename != "" && req.body.img_name != "" && req.body.service_tooltip != "" && req.body.service_description != "") {

            if (req.body.img_name == "") {
                return res.status(400).send('Please upload a file.');
            }
            var data = {
                title: req.body.title,
                servicename: req.body.servicename,
                service_image: req.body.img_name,
                service_tooltip: req.body.service_tooltip,
                service_description: req.body.service_description,
                serviceID: req.body.serviceID
            }
            console.log(data);
            const servicesave = new subservicemodel(data);
            const serviceresult = await servicesave.save();
            console.log(`${serviceresult}`);
            res.send(`${serviceresult}`);
        }
        else {
            console.log(`All field is requireed`);
            res.send(`All field is requireed`);


        }

    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }

})
router.delete('/delete_subservice/:id', async (req, res) => {
    try {
        const subserviceID = await req.params.id;
        subservicemodel.findByIdAndRemove({ _id: subserviceID }, (err, doc) => {
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
router.patch('/update_subservice/:id', async (req, res) => {
    try {
        if (req.body.title != "" && req.body.servicename != "" && req.body.img_name != "" && req.body.service_tooltip != "" && req.body.service_description != "") {
            const subserviceID = await req.params.id;
            if (req.body.img_name == "") {
                return res.status(400).send('Please upload a file.');
            }
            var data = {
                title: req.body.title,
                servicename: req.body.servicename,
                service_image: req.body.img_name,
                service_tooltip: req.body.service_tooltip,
                service_description: req.body.service_description,
                serviceID: req.body.serviceID
            }

            const result = await subservicemodel.findByIdAndUpdate({ _id: subserviceID }, data, { new: true });
            if (result != null) {
                res.send(result);
            }
            else {
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

router.get('/all_subserive', async (req, res) => {
    try {
        subservicemodel.find({}, (err, resp) => {
            if (!err) {
                const response = {
                    status: 200,
                    data: resp
                };
                res.send(response);
            } else {
                const response = {
                    status: 400,
                    data: err
                };
                res.send(response);
            }
        });
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
router.get('/get_allsubservices_service/:id', async (req, res) => {

    try {

        const serviceID = await req.params.id;
        const result = await subservicemodel.find({ serviceID: serviceID }).populate('serviceID');

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
router.get('/get_single_services_subservice/:id', async (req, res) => {

    try {

        const subserviceID = await req.params.id;
        const result = await subservicemodel.find({ _id: subserviceID }).populate('serviceID');

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }
})
module.exports = router;   
