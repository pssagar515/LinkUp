const r2 = require("r2");

(async()=>{
    let data = await r2('http://localhost:3000/data').text
    console.log(data);
})()