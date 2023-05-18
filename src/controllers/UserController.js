const usermodel = require('../modals/user');
const departments = require('../modals/department');
const addresses = require('../modals/address');
const permissionmodel = require('../modals/permission');
module.exports.setpermission = async (req,res) => {
  try { 
      
       const usertype = await req.body.usertype;
       const permission = await req.body.permission;
       const result = await permissionmodel.updateOne({ usertype: usertype }, {$set:{usertype:usertype,permission:permission}}, {upsert:true });
       if (result != null) {
         const response = {
           status: 200,
           data: result
         };
         res.send(response);
       }
       else {
         const response = {
           status: 500,
           data: "Something Went Wrong"
         };
         res.send(response);
       }
  }
  catch (err) {

    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }   

}
module.exports.getpermission = async (req, res) => {
  try {
    
    permissionmodel.find({}, (err, resp) => {
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
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}

module.exports.getalluser = async (req, res) => {
  try { 
    usermodel.aggregate([
      { $lookup:
        {
          from: 'addresses',
          localField: 'userID', 
          foreignField: '_id',
          as: 'address'  
        } 
      }
    ], (err, resp) => {
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
    const response = {
      status: 400,
      data: err
    };
    res.send(response);

  }
}
module.exports.user = async (req, res) => {
  try {
    const userID = await req.params.id;
    usermodel.find({ _id: userID }, (err, resp) => {
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

    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}
module.exports.updateuser = async (req, res) => {
  try {

    const userID = await req.params.id;
    const result = await usermodel.findByIdAndUpdate({ _id: userID }, req.body, { new: true });
    if (result != null) {
      const resp = {
        status: 200,
        message: result
      }
      res.send(resp);
    }
    else {
      const resp = {
        status: 500,
        message: 'something went wrong'
      }
      res.send(resp);
    }

  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }

}
module.exports.deleteuser = async (req, res) => {
  try {

    const userID = await req.params.id;
    usermodel.findByIdAndDelete({ _id: userID }, (err, resp) => {
      if (!err) {
        const response = {
          status: 200,
          data: 'success'
        };
        res.send(response);
      } else {
        const response = {
          status: 400,
          data: "Failed to delete User Details" + err
        };
        res.send(response);
      }
    });
  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }

}

module.exports.getdepartment = async (req, res) => {
  try {
    departments.find({}, (err, resp) => {
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
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}

module.exports.saveaddress = async (req, res) => {
  try {


    if (req.body.address != "" && req.body.userID != "" && req.body != null) {

      var data = {
        address: req.body.address,
        userID: req.body.userID
      }
      const useraddress = new addresses(data);
      var result = await useraddress.save();

      if (result != null) {

        const response = {
          status: 200,
          data: result
        };
        res.send(response);
      }
      else {
        const response = {
          status: 500,
          data: "Something Went Wrong"
        };
        res.send(response);

      }

    }
    else {
      const response = {
        status: 400,
        data: "All Field Is Required"
      };
      res.send(response);

    }
  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }

}

module.exports.updateaddress = async (req, res) => {
  try {

    const addressID = await req.params.id;
    const result = await addresses.findByIdAndUpdate({ _id: addressID }, req.body, { new: true });
    if (result != null) {
      const response = {
        status: 200,
        data: result
      };
      res.send(response);
    }
    else {
      const response = {
        status: 500,
        data: "Something Went Wrong"
      };
      res.send(response);
    }
  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}

module.exports.deleteaddress = async (req, res) => {
  try {

    const addressID = await req.params.id;
    addresses.findByIdAndDelete({ _id: addressID }, (err, resp) => {
      if (!err) {
        const response = {
          status: 200,
          data: 'success'
        };
        res.send(response);
      } else {
        const response = {
          status: 400,
          data: "Failed to delete User Details" + err
        };
        res.send(response);
      }
    });
  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }

}
module.exports.fetchalluseraddress = async (req, res) => {
  try {

    const userID = await req.params.id;
    addresses.find({ userID: userID }, (err, resp) => {
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
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}
module.exports.fetchuseraddress = async (req, res) => {
  try {

    const id = await req.params.id;
    addresses.find({ _id: id }, (err, resp) => {
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
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}
module.exports.updateprofile = async (req,res) => {
  try {

    const userID = await req.params.id;
    const result = await usermodel.findByIdAndUpdate({ _id: userID }, { document: JSON.stringify(req.body) }, { new: true });
    if (result != null) {
      const response = {
        status: 200,
        data: result
      };
      res.send(response);
    }
    else {
      const response = {
        status: 500,
        data: "Something went Wrong"
      };
      res.send(response);
    }

  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}

module.exports.deleteprofile = async (req,res) => {
  try{

    const userId = await req.params.id;
    const result = await usermodel.findByIdAndUpdate({ _id: userId }, { document: '' }, { new: true });
    if(result != null)
    {
      const response = {
        status: 200,
        data: result
      };
      res.send(response);
    }
    else{
      const response = {
        status: 500,
        data: "Something Went Wrong"
      };
      res.send(response);
    }
  }
  catch (err) {
    const response = {
      status: 400,
      data: err
    };
    res.send(response);
  }
}

module.exports.edituserprofile = async(req,res)=>
{
  try {
    const userID = await req.params.id;
    const checkuser = await usermodel.findOne({ _id: userID });
    if (checkuser != null) {
        const address_array = await req.body.address;
        for (var key in address_array) {
          
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
           
            delete req.body['address'];
            const result = await usermodel.findByIdAndUpdate({ _id: userID }, userdata, { new: true });
            const response = {
              status: 200,
              data: result
            };
            res.send(response);
        }
        else {
           
          const response = {
            status: 422,
            data: "Incorrect Email Or Phone No"
          };
          res.send(response);
        }

    }
    else {
       
      const response = {
        status: 422,
        data: "User Not exit"
      };
      res.send(response);
    }
   
}
catch (err) {
  const response = {
    status: 400,
    data: err
  };
  res.send(response);
}

} 
