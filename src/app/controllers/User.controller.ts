import { Request, Response } from "express"
import { User } from "../models/User.model"
import { IUser } from "../interfaces/User.interface"
import bcrypt from "bcrypt"
import { createToken, getUserByToken } from "../helpers/token.helper"
import { Types } from "mongoose"

export default class UserController {
    static async register(
        req: Request,
        res: Response
    ): Promise<Response | void> {
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

            await createToken(user, req, res)
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }

    static async login(req: Request, res: Response): Promise<Response | void> {
        const data: IUser = req.body

        try {
            const user: IUser | null = await User.findOne({ email: data.email })

            if (!user) {
                return res.status(422).json({
                    message: "Não há usuário cadastrado com este e-mail!",
                })
            }

            if (!(await bcrypt.compare(data.password, user.password))) {
                return res.status(422).json({
                    message: "Senha inválida",
                })
            }

            await createToken(user, req, res)
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }

    static async logout(req: Request, res: Response): Promise<Response> {
        try {
            req.headers.authorization = undefined

            return res
                .status(200)
                .json({ message: "Logout efetuado com sucesso" })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }

    static async profile(req: Request, res: Response): Promise<Response> {
        try {
            const user: IUser | boolean = await getUserByToken(req, res)

            if (!user) {
                return res.status(401).json({ message: "Acesso Negado!" })
            }

            return res
                .status(200)
                .json({ message: "Usuário encontrado com sucesso", user })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }

    static async update(req: Request, res: Response): Promise<Response> {
        const data: IUser = req.body
        const id: Types.ObjectId = new Types.ObjectId(req.params.id)

        try {
            if (data.password !== data.confirmPassword) {
                return res.status(422).json({
                    message: "A confirmação de senha precisa ser igual a senha",
                })
            }

            const user: IUser | null = await User.findOne({ email: data.email })

            if (user && user.email !== data.email) {
                return res.status(422).json({
                    message: "Por favor, utilize outro e-mail",
                })
            }
            

            const updatedUser = await User.findOneAndUpdate({ _id: id }, data)
            

            if (!updatedUser) {
                return res
                    .status(422)
                    .json({ message: "Usuário não encontrado" })
            }

            return res
                .status(200)
                .json({ message: "Usuário atualizado com sucesso" })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }
}
