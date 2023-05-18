const express = require('express');
const router = new express.Router();
const sidemenu = require('../modals/sidemenu');
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');

router.use(cors());
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

router.post('/sidemenu', async (req, res) => {
  try {
    let message = "";
    console.log(req.body, "dfdfdfdf");
    if (req.body.name == "" || req.body.link == "" || req.body.toltip == "" || req.body.level == "" || req.body.type == "") {
      if (req.body.name == "" || req.body.link == "" || req.body.toltip == "" || req.body.level == "" || req.body.type == "") {
        message = "All field is required";
      } else if (req.body.type == "icon" && req.body.icon == "") {
        message = "Icon field is required";
      } else if (req.body.type != "icon" && req.body.menuimage === undefined) {
        message = "Image field is required";
      }
      const resp = {
        status: 300,
        message: message
      }
      res.send(resp);
    }
    var data = {
      name: req.body.name,
      link: req.body.link,
      toltip: req.body.toltip,
      level: req.body.level,
      type: req.body.type,
      icon: req.body.icon,
      menuimage: "dff"
    };
    if (req.body.menuimage) {
      data.menuimage = req.body.menuimage;
    }
    console.log("dsddsds", data);
    const sidemenusave = new sidemenu(data);
    const serviceresult = await sidemenusave.save();
    console.log(`${serviceresult}`);
    res.send(`${serviceresult}`);
  } catch (err) {
    res.send(`${err} error`);
  }
});

router.delete('/delete_sidemenu', async (req, res) => {
  try {
    sidemenu.findByIdAndRemove({ _id: req.body.id }, (err, doc) => {
      if (!err) {
        res.send('success');
      } else {
        res.send('Failed to Delete user Details: ' + err);
      }
    });
  }
  catch (err) {
    res.send(`${err} error`);
  }
});

router.patch('/update_sidemenu/:id', async (req, res) => {
  try {
    let message = "";
    if (req.body.name == "" || req.body.link == "" || req.body.toltip == "" || req.body.level == "" || req.body.type == "") {
      if (req.body.name == "" || req.body.link == "" || req.body.toltip == "" || req.body.level == "" || req.body.type == "") {
        message = "All field is required";
      } else if (req.body.type == "icon" && req.body.icon == "") {
        message = "Icon field is required";
      } else if (req.body.type != "icon" && req.body.menuimage === undefined) {
        message = "Image field is required";
      }
      const resp = {
        status: 300,
        message: message
      }
      res.send(resp);
    }
    var data = {
      name: req.body.name,
      link: req.body.link,
      toltip: req.body.toltip,
      level: req.body.level,
      type: req.body.type,
      menuimage: req.body.icon
    };
    const sidemenuID = await req.params.id;
    const result = await sidemenu.findByIdAndUpdate({ _id: sidemenuID }, data, { new: true });
    if (result != null) {
      res.send(result);
    } else {
      const resp = {
        status: 500,
        message: 'something went wrong'
      }
      res.send(resp);
    }
  } catch (err) {
    res.send(`${err} error`);
  }
});

router.get('/get_all_side_menu', async (req, res) => {

  try {

    const all_side_menu = await sidemenu.find();
    if (all_side_menu == null) {
      res.status(200).send('No Side Menu Exist');
    }
    else {
      res.status(200).send(all_side_menu);
    }
  }
  catch (err) {
    res.status.send(`$(err)`);
  }
});

router.get('/all_single_sidemenu/:id', async (req, res) => {
  try {
    const _id = await req.params.id;
    const all_side_menu = await sidemenu.find({ _id });
    if (all_side_menu == null) {
      res.status(200).send('No Side Menu Exist');
    } else {
      res.status(200).send(all_side_menu);
    }
  } catch (err) {
    res.status.send(`$(err)`);
  }
});

module.exports = router;   
