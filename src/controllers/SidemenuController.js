const sidemenu = require('../modals/sidemenu');
module.exports.list = async (req, res) => {
    try {
        sidemenu.find({}, (err, resp) => {
            if (!err) {
                const response = {
                    status: 200,
                    data: resp

                }
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
module.exports.savesidemenu = async (req, res) => {
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
            menuimage: req.body.menuimage
        };
        if (req.body.menuimage) {
            data.menuimage = req.body.menuimage;
        }
        console.log(data);
        const sidemenusave = new sidemenu(data);
        const serviceresult = await sidemenusave.save();
        if (serviceresult != null) {
            const response = {
                status: 200,
                data: 'success'
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
        console.log(err);
        res.send(response);
    }
}

module.exports.deletesidemenu = async (req, res) => {
    try {
        sidemenu.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
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
module.exports.updatesidemenu = async (req, res) => {
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
        const result = await sidemenu.findByIdAndUpdate({ _id: sidemenuID }, data, { new: true });
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
            status: 500,
            message: 'something went wrong'
        }
        res.send(resp);
    }
}
module.exports.singlesidemenu = async(req,res)=>{
    try {
        const _id = await req.params.id;
        sidemenu.find({_id}, (err, resp) => {
            if (!err) {
                const response = {
                    status: 200,
                    data: resp

                }
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