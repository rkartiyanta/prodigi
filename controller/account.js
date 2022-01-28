import Account from "../model/account.js";
import { checkNull } from '../pkg/string.js';

export const createAccount = async (req, res) => {
    try {
        let stringdata = JSON.stringify(req.body);
        let data = JSON.parse(stringdata);

        let errorMessage = ""
        if (checkNull(data.name)) {
            errorMessage = "Namne cannot be empty";
        }
        if (checkNull(data.email)) {
            errorMessage = "Email cannot be empty";
        }
        if (checkNull(data.password)) {
            errorMessage = "Password cannot be empty";
        }
        if (checkNull(data.confirm_password)) {
            errorMessage = "Confirm password cannot be empty";
        }
        if (data.confirm_password !== data.password) {
            errorMessage = "Confirm password do not match";
        }
        if (checkNull(data.role)) {
            errorMessage = "Role cannot be empty";
        }

        if (errorMessage != "") {
            res.status(400).json({ error: errorMessage });
            return
        }

        await Account.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role.toUpperCase()
        });

        res.status(201).json({
            "message": "Account created"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        let stringdata = JSON.stringify(req.body);
        let data = JSON.parse(stringdata);

        let errorMessage = ""
        if (checkNull(data.email)) {
            errorMessage = "Email cannot be empty";
        }
        if (checkNull(data.password)) {
            errorMessage = "Password cannot be empty";
        }

        if (errorMessage != "") {
            res.status(400).json({ error: errorMessage });
            return
        }

        const account = await Account.findAll({
            where: {
                email: data.email,
                password: data.password
            },
            attributes: ["id", "role"]
        })
        res.json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}