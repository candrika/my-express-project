require('dotenv').config();
const express      = require('express'); 
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const router       = require('./routes/index');
const path         = require('path');


const port = process.env.PORT;
const app = express();

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

//use template engine ejs
app.set('views','./views');
app.set('view engine','ejs');

app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Headers",
        "Origin, X-Requested-with, Content-Type, Authorization, x-token"
    )

    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, DELETE, GET");

        return res.status(200).json({})
    }

    next();
})

app.use(router);

app.use((req,res,next)=>{

    res.status(400).send({
        status:false,
        message:'request yang anda minta tidak tersedia',
    })

    next();
})

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
});