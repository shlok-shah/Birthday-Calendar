"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
const { home, adduser, search, closestbirthday, update, Delete } = require("./controller/bdaycontroller");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose_1.default.connect("mongodb+srv://" + process.env.USER_KEY + "@birthdays.xjxd6u1.mongodb.net/?retryWrites=true&w=majority").then(() => console.log("connected to server")).catch(err => console.log(err));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.get('/', (req, res) => home(req, res));
app.post('/AddUser', (req, res) => adduser(req, res));
app.get('/search', (req, res) => search(req, res));
app.get('/closestbday', (req, res) => closestbirthday(req, res));
app.post('/update', (req, res) => update(req, res));
app.post('/delete', (req, res) => Delete(req, res));
app.listen(process.env.PORT, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Listening to port " + process.env.PORT);
});
