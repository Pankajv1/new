var express = require('express');
var rootRouter = express.Router();
const user = require('./router/user');
const service = require('./router/service');
const sidemenu = require('./router/sidemenu');
const fileupload = require('./router/fileupload');
const sub_routerservice = require('./router/subservice');
///sub side menu
const subsidemenumodal = require('./modals/subsidemenu');
const routersubsidemenu = require('./router/subsidemenu');

rootRouter.use("/user", user);
rootRouter.use("/service", service);
rootRouter.use("/fileupload", fileupload);
rootRouter.use("/sidemenu", sidemenu);
rootRouter.use(sub_routerservice);
rootRouter.use(routersubsidemenu);

module.exports = rootRouter;