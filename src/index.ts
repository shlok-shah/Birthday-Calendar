import mongoose from "mongoose";

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config()
const {home,adduser,search,closestbirthday,update,Delete} = require("./controller/bdaycontroller")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect("mongodb+srv://"+ process.env.USER_KEY +"@birthdays.xjxd6u1.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("connected to server")).catch(err => console.log(err))

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', (req: Request,res: Response) => home(req,res));
app.post('/AddUser', (req: Request,res: Response) => adduser(req,res))
app.get('/search',(req: Request,res: Response) => search(req,res))
app.get('/closestbday', (req: Request,res: Response) => closestbirthday(req,res)) 
app.post('/update', (req: Request,res: Response) => update(req,res))
app.post('/delete', (req: Request,res: Response) => Delete(req,res))

app.listen(process.env.PORT,(err: Error) => {
    if(err) console.log(err)
    else console.log("Listenin to port " + process.env.PORT)
})