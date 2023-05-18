
const usermodel = require('../modals/user');
const bcrypt = require('bcryptjs');
const validator = require("email-validator");
const validatePhoneNumber = require('validate-phone-number-node-js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../constant');
module.exports.registation = async (req, res) => {
  try {  

    if ((req.body.email_phone != "" && req.body.username != "")) {
      
      const finduser = await usermodel.findOne({
        $or:
          [
            { username: req.body.username },
            { email: req.body.email_phone },
            { phoneno: req.body.email_phone }
          ]
      });
     
      if (finduser != null) {
     
        if (finduser.username == req.body.username) {
          const response = {
            status: 422,
            data: `User Name already exist `
          };
          res.send(response);
        }
        else if (finduser.email == req.body.email_phone) {
          const response = {
            status: 422,
            data: `EmailID already exist `
          };
          res.send(response);
        }
        else {
          const response = {
            status: 422,
            data: `Phone no. already exist `
          };
          res.send(response);
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
            const response = {
              status: 422,
              data: `Please Enter Valid Email ID `
            };
            res.send(response);
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
            const response = {
              status: 422,
              data: `Invalid Length Phone No .`
            };
            res.send(response);


          }

        }
        else {
          const response = {
            status: 422,
            data: `Please  Enter Valid Email Or Phone No.`
          };
          res.send(response);
        }
        const user = new usermodel(data);
        const result = await user.save();
        if (result != null) {
          const response = {
            status: 200,
            data: `${result}`
          };
          res.send(response);
        } else {
          const resp = {
            status: 500,
            message: 'something went wrong '
          }
          res.send(resp);
        }

      }
    }
    else {
      if (req.body.email_phone == "") {
        const response = {
          status: 422,
          data: `Please Enter Phone No. Or Email `
        };
        res.send(response);
      }
      else {
        const response = {
          status: 422,
          data: `Please Enter UserName`
        };
        res.send(response);
      }
    }
  }
  catch (err) {
    const response = {
      status: 400,
      data: `${err} `
    };
    res.send(response);
  }
}

module.exports.login = async (req, res) => {
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
        const response = {
          message: "success",
          data: finduser,
          token: token,
          status: 200
        };
        res.send(JSON.stringify(response));
        res.end();
      }
      else {
        const response = {
          status: 422,
          data: `Wrong Credential`
        };
        res.send(response);
      }
    }
    else {
      const response = {
        status: 422,
        data: `Wrong Credential`
      };
      res.send(response);
    }
  }
  catch (err) {
    const response = {
      status: 400,
      data: `${err}`
    };
    res.send(response);
  }
}
