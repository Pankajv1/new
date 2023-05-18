const subservice = require('../modals/subservice');
module.exports.list = async (req, res) => {
    try {
            const result = await subservice.aggregate([
                { $lookup:
                  {
                    from: 'services',
                    localField: 'serviceID', 
                    foreignField: '_id',
                    as: 'service'  
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
module.exports.savesubserice = async (req, res) => {
    try
    {
       
        if(req.body.title !="" && req.body.servicename !="" &&  req.body.img_name !="" && req.body.service_tooltip !="" && req.body.service_description !="")
        {
         
            var data =   {title: req.body.title,
                servicename: req.body.servicename,
                service_image:req.body.img_name,
                service_tooltip:req.body.service_tooltip,
                service_description:req.body.service_description,
                serviceID: req.body.serviceID
            }
            
            const savesubserice  = new subservice(data);
            const result =await savesubserice.save();
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
      
    } catch (err) {
        const response = {
            status: 400,
            data: err
        };
        res.send(response);
    }
}

module.exports.deletesubservice = async (req, res) => {
    try {
        const serviceID = await req.params.id;
        subservice.findByIdAndRemove({ _id: serviceID }, (err, doc) => {
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
module.exports.updatesubservice = async (req, res) => {
    try
    {
       
        if(req.body.title !="" && req.body.servicename !="" &&  req.body.img_name !="" && req.body.service_tooltip !="" && req.body.service_description !="")
        {
            const subserviceID = await req.params.id;
            var data =   {title: req.body.title,
                servicename: req.body.servicename,
                service_image:req.body.img_name,
                service_tooltip:req.body.service_tooltip,
                service_description:req.body.service_description,
                serviceID: req.body.serviceID
            }
            
            const result = await subservice.findByIdAndUpdate({ _id: subserviceID }, data, { new: true });
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
        res.send(err);
    }
}
module.exports.subservicebyservice = async(req,res)=>{
    try {
        
        const serviceID = await req.params.id;
        const result = await subservice.find({serviceID:serviceID}).populate('service');

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
module.exports.singlesubservice = async(req,res)=>{
    try {

        const subserviceID = await req.params.id;
        const result = await subservice.find({ _id: subserviceID }).populate('service');

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