const subsidemenu = require('../modals/subsidemenu');
module.exports.list = async (req, res) => {
    try {
        const result = await subsidemenu.aggregate([
            { $lookup:
              {
                from: 'sidemenus',
                localField: 'sidemenuID', 
                foreignField: '_id',
                as: 'sidemenu' 
              }
            }
          ]);  
          const response = {
            status: 200,
            data: result
        };
        res.send(response);
    } catch (err) {
        const response = {
            status: 400,
            data: err
        };
        res.send(response);
    }
}
module.exports.savesubsidemenu = async (req, res) => {
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
                status: 422,
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
            menuimage: req.body.icon,
            sidemenuID:req.body.sidemenuID
        };
        if (req.body.menuimage) {
            data.menuimage = req.body.menuimage;
        }
       
        const subsidemenudata = new subsidemenu(data);
        const result = await subsidemenudata.save();
        if (result != null) {
            const response = {
                status: 200,
                data:  result
            };
            res.send(response);
        }
        else {
            const response = {
                status: 500,
                data: 'Something Went wrong'
            };
            res.send(response);
        }

    } catch (err) {
        const response = {
            status: 400,
            data: err
        };

        res.send(response);
    }
}

module.exports.deletesubsidemenu = async (req, res) => {
    try {
        const subsidemenuID = await req.params.id;
        subsidemenu.findByIdAndRemove({ _id: subsidemenuID}, (err, doc) => {
            if (!err) {
                const response = {
                    status: 200,
                    data: 'success'
                };
                res.send(response);
            } else {
                const response = {
                    status: 400,
                    data: 'Failed to delete user details' + err
                };
                res.send(response);
            }
        });
    }
    catch (err) {
        const response = {
            status: 400,
            data: 'Failed to delete user details' + err
        };
        res.send(response);
    }
}
module.exports.updatesubsidemenu = async (req, res) => {
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
                status: 422,
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
        if (req.body.menuimage) {
            data.menuimage = req.body.menuimage;
        }
        const sidemenuID = await req.params.id;
        const result = await subsidemenu.findByIdAndUpdate({ _id: sidemenuID }, data, { new: true });
        if (result != null) {
            const resp = {
                status: 200,
                message: result
            }
            res.send(resp);
        } else {
            const resp = {
                status: 500,
                message: 'something went wrong'
            }
            res.send(resp);
        }
    }
    catch (err) {
        const resp = {
            status: 400,
            message: err
        }
        res.send(resp);
    }
}

module.exports.subsidemenubysidemenu = async(req,res)=>{
    try {
        
        const subsidemenuID = await req.params.id;
        const result = await subsidemenu.find({sidemenuID:subsidemenuID}).populate('sidemenu');

        const resp = {
            status: 200,
            message: result
        }
        res.send(resp);
    }
    catch (err) {
        const resp = {
            status: 400,
            message: err
        }
        res.send(resp);
    }
}
module.exports.singlesidemenu = async(req,res)=>{
    try {

        const subsidemenuID = await req.params.id;
        const result = await subsidemenu.find({ _id: subsidemenuID }).populate('sidemenu');

        const resp = {
            status: 200,
            message: result
        }
        res.send(resp);
    }
    catch (err) {
        const resp = {
            status: 400,
            message: err
        }
        res.send(resp);
    }
}