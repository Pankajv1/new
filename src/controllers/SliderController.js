const slider = require('../modals/slider');
module.exports.list = async (req, res) => {
    try {
        slider.find({}, (err, resp) => {
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
module.exports.saveslider = async (req, res) => {
    try
    {
       
        if(req.body.slider_image !="" )
        {
         
            var data =   {title: req.body.title,
                slider_image: req.body.slider_image
            }
            
            const saveslider  = new slider(data);
            const sliderresult =await saveslider.save();
            console.log(sliderresult);
            if(sliderresult != null)
            {
                const response = {
                    status: 200,
                    data: sliderresult
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

module.exports.deleteslider = async (req, res) => {
    try {
        slider.findByIdAndRemove({ _id: req.body.id }, (err, doc) => {
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
module.exports.updateslider = async (req, res) => {
    try
    {
       
        if(req.body.slider_image !="")
        {
            const sliderID = await req.params.id;
            var data =   {title: req.body.title,
                slider_image: req.body.slider_image
            }
            
            
            const result = await slider.findByIdAndUpdate({ _id: sliderID }, data, { new: true });
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
module.exports.singleslider = async(req,res)=>{
    try {
        const _id = await req.params.id;
        slider.find({_id}, (err, resp) => {
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