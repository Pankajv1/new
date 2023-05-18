const service = require('../modals/service');
module.exports.list = async (req, res) => {
    try {
        service.find({}, (err, resp) => {
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
module.exports.saveservice = async (req, res) => {
    try
    {
       
        if(req.body.title !="" && req.body.servicename !="" &&  req.body.img_name !="" && req.body.service_tooltip !="" && req.body.service_description !="")
        {
            console.log(req.body);
            var data =   {title: req.body.title,
                servicename: req.body.servicename,
                service_image:req.body.img_name,
                service_tooltip:req.body.service_tooltip,
                service_description:req.body.service_description
            }
            
            const servicesave  = new service(data);
            const serviceresult =await servicesave.save();
            if(serviceresult != null)
            {
                const response = {
                    status: 200,
                    data: serviceresult
                };
                res.send(response);
            }
            else{
                const response = {
                    status: 500,
                    data: "Something went wrong"
                };
                res.send(response);
            }
        }
        else
        {
            const response = {
                status: 422,
                data: 'All Field is required' 
            };
            res.send(response);
         
            
        }
      
    } catch (err) {
        console.log(err);
        const response = {
            status: 400,
            data: err
        };
        res.send(response);
    }
}

module.exports.deleteservice = async (req, res) => {
    try {
        const serviceID = await req.params.id;
        service.findByIdAndRemove({ _id: serviceID }, (err, doc) => {
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
module.exports.updateservice = async (req, res) => {
    try
    {
       
        if(req.body.title !="" && req.body.servicename !="" &&  req.body.img_name !="" && req.body.service_tooltip !="" && req.body.service_description !="")
        {
            const serviceID = await req.params.id;
            var data =   {title: req.body.title,
                servicename: req.body.servicename,
                service_image:req.body.img_name,
                service_tooltip:req.body.service_tooltip,
                service_description:req.body.service_description
            }
            
            const result = await service.findByIdAndUpdate({ _id: serviceID }, data, { new: true });
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
                    data: "Something went wrong"
                };
                res.send(response);
            }
        }
        else
        {
            const response = {
                status: 422,
                data: 'All Field is required' 
            };
            res.send(response);
         
            
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
module.exports.singleservice = async(req,res)=>{
    try {
        const _id = await req.params.id;
        service.find({_id}, (err, resp) => {
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