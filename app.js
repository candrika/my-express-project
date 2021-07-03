require('dotenv').config();
const express      = require('express'); 
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const router       = require('./routes/index');
const path         = require('path');
const bodyParser   = require('body-parser');
// const cors         = require("cors");

const port = process.env.PORT || 3000;
const app = express();

// app.use(cors());
// app.options('*', cors());

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


app.use((req, res, next) => { //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over
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