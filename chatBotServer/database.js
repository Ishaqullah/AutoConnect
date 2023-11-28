const {Client}= require('pg');
const client=new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1401",
    database:"auto_connect"

})

client.connect();

client.query(`Select * from vehicle;`,(err,res)=>{

    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;

})
