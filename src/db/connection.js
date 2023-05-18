const mongoose = require('mongoose');
mongoose.connect( "mongodb+srv://pankaj:oWsD9RneRBadXTZO@cluster0.xojmgrl.mongodb.net/allservice?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Mongo db connection successfully'))
.catch((err)=>console.log('something went wrong'+err));     