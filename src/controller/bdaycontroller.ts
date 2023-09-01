import { Request, Response } from "express";
import {userbirthday} from "../model/userinterface"
import date from 'date-and-time';
import {User} from '../model/birthday';



exports.home = async (req: Request,res: Response): Promise<void> => {
    try {
        const response: userbirthday[] = await User.find({})
        return res.render('home.ejs', {namesfound: {}, data: response});
    }
    catch(error) {
        console.log(error)
    } 
}

exports.adduser = async (req: Request,res: Response): Promise<void> => {
    
    try {
        let data: userbirthday = req.body;
        const user = new User(data);
        await user.save()
        console.log('User Added')
        return res.redirect('/');
    }
    catch (err) {
        console.log(err)
    }
}

exports.search = async (req: Request,res: Response): Promise<void> => {
    try{
        const namesfound: userbirthday[] = await User.find({name: req.query.Name})
        const data: userbirthday[] = await User.find({})
        console.log(namesfound)
        return res.render('../views/home.ejs', {namesfound: namesfound, data});
    }
    catch(error) {
        console.log(error)
    }   
}

exports.closestbirthday = async (req: Request,res: Response): Promise<void> => {
    try {
        let names: userbirthday[] = await User.find({});
        let now: Date = new Date();
        console.log(date.format(now, 'ddd, MMM, DD YYYY'));
        let alldates: Date[] = [];
        names.forEach((name) => alldates.push(date.parse(name.birthday, 'YYYY-MM-DD')));
        let difference: number[] = [];
        alldates.forEach((dates) =>{
            let diff:number = date.subtract(dates, now).toDays() % 365;
            if( diff < 0)
                diff += 365.25;
            difference.push(diff)
    })
        let x:number = 0;
        let closebday: number = difference[0];
        difference.forEach((differ, index) => {
            if(closebday > differ){
                x = index;
                closebday = differ;
            } 
        })  
        return res.render('../views/ClosestBday', {closestbdayobj:names[x]})
    }
    catch(error) {
        console.log(error)
    }
}

exports.update = async (req: Request,res: Response): Promise<void> => {
    try {
        await User.findOneAndUpdate({name: req.body.name} , {birthday: req.body.birthday},{new: true})
        console.log("User updated")
        return res.redirect('/');
    }
    catch (error){
        console.log(error)
    }
}

exports.Delete = async (req: Request,res: Response): Promise<void> => {
    try {
        await User.findOneAndDelete({name: req.body.name})
        console.log('deleted user');
        return res.redirect('/');
    }
    catch (error) {
        console.log(error)
    }  
}