const config  = require("config");
const {port} = config.get("Server")
const www = require('src/app');

www.listen( port, ()=>{
	console.log(`server start at port ${port}`);
})
