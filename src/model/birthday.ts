import mongoose, {Schema} from "mongoose";
import { userbirthday } from "./userinterface";

const userSchema: Schema<userbirthday> = new mongoose.Schema ({
    name: {type: String, required: true},
    birthday: {type: String, required: true}

});

export const User = mongoose.model("User", userSchema);