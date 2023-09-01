"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_and_time_1 = __importDefault(require("date-and-time"));
const birthday_1 = require("../model/birthday");
exports.home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield birthday_1.User.find({});
        return res.render('home.ejs', { namesfound: {}, data: response });
    }
    catch (error) {
        console.log(error);
    }
});
exports.adduser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        const user = new birthday_1.User(data);
        yield user.save();
        console.log('User Added');
        return res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});
exports.search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const namesfound = yield birthday_1.User.find({ name: req.query.Name });
        const data = yield birthday_1.User.find({});
        console.log(namesfound);
        return res.render('../views/home.ejs', { namesfound: namesfound, data });
    }
    catch (error) {
        console.log(error);
    }
});
exports.closestbirthday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let names = yield birthday_1.User.find({});
        let now = new Date();
        console.log(date_and_time_1.default.format(now, 'ddd, MMM, DD YYYY'));
        let alldates = [];
        names.forEach((name) => alldates.push(date_and_time_1.default.parse(name.birthday, 'YYYY-MM-DD')));
        let difference = [];
        alldates.forEach((dates) => {
            let diff = date_and_time_1.default.subtract(dates, now).toDays() % 365;
            if (diff < 0)
                diff += 365.25;
            difference.push(diff);
        });
        let x = 0;
        let closebday = difference[0];
        difference.forEach((differ, index) => {
            if (closebday > differ) {
                x = index;
                closebday = differ;
            }
        });
        return res.render('../views/ClosestBday', { closestbdayobj: names[x] });
    }
    catch (error) {
        console.log(error);
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield birthday_1.User.findOneAndUpdate({ name: req.body.name }, { birthday: req.body.birthday }, { new: true });
        console.log("User updated");
        return res.redirect('/');
    }
    catch (error) {
        console.log(error);
    }
});
exports.Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield birthday_1.User.findOneAndDelete({ name: req.body.name });
        console.log('deleted user');
        return res.redirect('/');
    }
    catch (error) {
        console.log(error);
    }
});
