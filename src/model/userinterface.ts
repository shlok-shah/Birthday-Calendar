import { Document } from "mongoose";

export interface userbirthday extends Document{
    name: string;
    birthday: string;
}
