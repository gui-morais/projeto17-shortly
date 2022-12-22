import { addUser } from "../../repositories/userRepositories.js";
import bcrypt from "bcrypt";

export function signUp(req,res) {
    const user = req.body;
    const encrtyptedPassword = bcrypt.hashSync(user.password,10);
    user.password = encrtyptedPassword;
    if(addUser(user)) {
        return res.sendStatus(201);
    } else {
        return res.sendStatus(500);
    }
}