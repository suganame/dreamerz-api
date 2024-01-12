import { Request, Response } from "express"
import { User } from "../models/User"
import { IUser } from "../interfaces/IUser"
import bcrypt from "bcrypt"
import { createToken } from "../helpers/token"

export default class UserController {
    static async create(req: Request, res: Response): Promise<Response> {
        const { email, password, confirmPassword, name } = req.body

        if (password !== confirmPassword) {
            return res.status(422).json({
                message: "A confirmação de senha precisa ser igual a senha",
            })
        }

        if (await User.findOne({ email })) {
            return res.status(422).json({
                message: "Por favor, utilize outro e-mail",
            })
        }

        try {
            const user: IUser = await User.create({
                email,
                password: await bcrypt.hash(password, await bcrypt.genSalt(12)),
                name,
            })

            createToken(user, req, res)

            return res
                .status(201)
                .json({ message: `Usuário ${user.name} criado com sucesso!` })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }
}
