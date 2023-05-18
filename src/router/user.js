const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const usermodel = require('../modals/user');
const departments = require('../modals/department');
const addresses = require('../modals/address');
const bcrypt = require('bcryptjs');
const validator = require("email-validator");
const validatePhoneNumber = require('validate-phone-number-node-js');
const { JWT_SECRET_KEY } = require('../constant');
const sidemenu = require('./sidemenu');

router.get('/list', async (req, res) => {
    try {
        sidemenu.find({}, (err, resp) => {
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
    } catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }
});

router.post('/registation', async (req, res) => {
    try {
        if (req.body.email_phone != "" || req.body.username != "") {
            const finduser = await usermodel.findOne({
                $or: [
                    { username: req.body.username },
                    { email: req.body.email_phone },
                    { phoneno: req.body.email_phone }
                ]
            });

            if (finduser != null) {
                if (finduser.username == req.body.username) {
                    console.log(`User Name already exist`);
                    res.status(400).send(`User Name already exist`);
                    res.end();
                }
                else if (finduser.email == req.body.email_phone) {
                    console.log(`Email ID already exist`);
                    res.status(400).send(`Email ID already exist`);
                    res.end();
                }
                else {
                    console.log(` PHone No. already exist`);
                    res.status(400).send(`Phone no already exist`);
                    res.end();
                }

            }
            else {


                var password = req.body.password;
                if (validator.validate(req.body.email_phone)) {
                    if (validator.validate(req.body.email_phone)) {
                        var data = {
                            first_name: req.body.first_name,
                            last_name: req.body.first_name,
                            username: req.body.username,
                            email: req.body.email_phone,
                            'password': password
                        }

                    }
                    else {
                        console.log('Invalid Email ID');
                        res.status(400).send(`Please Enter Valid Email ID`);
                        res.end();
                    }

                }
                else if (validatePhoneNumber.validate(req.body.email_phone)) {
                    if (req.body.email_phone.length == 10) {
                        var data = {
                            first_name: req.body.first_name,
                            last_name: req.body.first_name,
                            username: req.body.username,
                            phoneno: req.body.email_phone,
                            'password': password
                        }
                    }
                    else {
                        console.log('Invalid Length Phone No.');
                        res.status(400).send(`Invalid Length Phone No.`);
                        res.end();

                    }

                }
                else {
                    console.log('Invalid Phone No. Or EmailID');
                    res.status(400).send(`Invalid Phone No. Or EmailID.`);
                    res.end();

                }
                console.log(data);
                const user = new usermodel(data);
                const result = await user.save();
                console.log(`${result}`);
                res.status(200).send(`${result}`);

            }

        }
        else {
            if (req.body.email_phone != "") {
                console.log(`Please Enter Phone No Or Email`);
                res.status(400).send(`Please Enter Phone No Or Email`);
            }
            else {
                console.log(`Please Enter username`);
                res.status(400).send(`Please Enter Username`);
            }

        }

    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})

router.post('/login', async (req, res) => {
    try {

        const finduser = await usermodel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
                { phoneno: req.body.username }
            ]
        });
        if (finduser != null) {
            const password = req.body.password;

            const comparepassword = await bcrypt.compare(password, finduser.password);
            if (comparepassword) {
                const token = jwt.sign(finduser.toJSON(), JWT_SECRET_KEY);
                console.log('success', finduser);
                const response = {
                    message: "success",
                    data: finduser,
                    token: token
                };
                res.status(200).send(JSON.stringify(response));
                res.end();
            }
            else {
                console.log('Password Incorrect');
                res.status(400).send('Password Incorrect');
                res.end();
            }
        }
        else {
            console.log('User Name not exist ');
            res.status(400).send('User Name not exist ');
            res.end();

        }


    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.get('/getuserdata', async (req, res) => {
    try {


        const result = await usermodel.find({});

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.get('/user/:id', async (req, res) => {
    try {

        const userID = await req.params.id;
        const result = await usermodel.find({ _id: userID });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.patch('/upadateuser/:id', async (req, res) => {
    try {

        const userID = await req.params.id;
        const result = await usermodel.findByIdAndUpdate({ _id: userID }, req.body, { new: true });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.delete('/deleteuser/:id', async (req, res) => {
    try {

        const userID = await req.params.id;
        const result = await usermodel.findByIdAndDelete({ _id: userID });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.get('/getdepartment', async (req, res) => {
    try {


        const alldepartment = await departments.find();

        console.log(`${alldepartment}`);
        res.status(200).send(`${alldepartment}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.post('/saveaddress', async (req, res) => {
    try {


        if (req.body.address != "" && req.body.userID != "") {
            var data = {
                address: req.body.address,
                userID: req.body.userID
            }
            const useraddress = new addresses(data);
            const result = await useraddress.save();
            console.log(`${result}`);
            res.status(200).send(`${result}`);
        }
        else {
            console.log('All Fields Is required');
            res.status(400).send(`All Fields Is required`);
            res.end();

        }
    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }

})
router.patch('/updateaddress/:id', async (req, res) => {
    try {

        const addressID = await req.params.id;
        const result = await addresses.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.delete('/deleteaddress/:id', async (req, res) => {
    try {

        const addressID = await req.params.id;
        const result = await addresses.findByIdAndDelete({ _id: addressID });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})

router.get('/fetch_alluser_address/:id', async (req, res) => {
    try {

        const userID = await req.params.id;
        const result = await addresses.find({ userID: userID });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})

router.get('/fetch_singleuser_address/:id', async (req, res) => {
    try {

        const id = await req.params.id;
        const result = await addresses.find({ _id: id });
        if (result != null) {

            res.status(200).send(`${result}`);
        }
        else {
            res.status(400).send(`${result}`);
        }

    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})

router.patch('/updateprofile/:id', async (req, res) => {
    try {

        const userID = await req.params.id;
        console.log({ document: JSON.stringify(req.body) });
        const result = await usermodel.findByIdAndUpdate({ _id: userID }, { document: JSON.stringify(req.body) }, { new: true });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.delete('/deleteprofile/:id', async (req, res) => {
    try {

        const userId = await req.params.id;
        const result = await usermodel.findByIdAndUpdate({ _id: userId }, { document: '' }, { new: true });

        console.log(`${result}`);
        res.status(200).send(`${result}`);
    }
    catch (err) {
        console.log(`${err} error`);
        res.status(400).send(`${err} error`);
    }

})
router.post('/edituserprofile/:id', async (req, res) => {

    try {
        const userID = await req.params.id;
        const checkuser = await usermodel.findOne({ _id: userID });
        if (checkuser != null) {
            const address_array = await req.body.address;
            for (var key in address_array) {
                console.log(address_array[key]);
                console.log(key);
                if (address_array.hasOwnProperty(key)) {
                    if (address_array[key]._id != "") {
                        const result = await addresses.findByIdAndUpdate({ _id: address_array[key]._id }, { address: address_array[key].address }, { new: true });
                    }
                    else {

                        const useraddress = new addresses({ address: address_array[key].address, userID: userID });
                        const result = await useraddress.save();
                    }
                }
            }
            const userdata = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email_phone: req.body.email_phone,
                password: await bcrypt.hash(req.body.password, 10),
                document: JSON.stringify(req.body.document)
            }
            if (validator.validate(req.body.email_phone == true) || validatePhoneNumber.validate(req.body.email_phone) == true) {
                console.log(req.body);
                delete req.body['address'];
                const result = await usermodel.findByIdAndUpdate({ _id: userID }, userdata, { new: true });
                res.status(200).send(result);
            }
            else {
                console.log('Incorrect Email Or Phone');
                res.status(400).send('Incorrect Email Or Phone');
            }

        }
        else {
            console.log('User not exist');
            res.send('User Not exist');
        }
        console.log(checkuser);
    }
    catch (err) {
        console.log(`${err} error`);
        res.send(`${err} error`);
    }

})

module.exports = router;   