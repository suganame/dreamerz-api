import { Request, Response } from "express"
import { Dream } from "../models/Dream"
import { getUserByToken } from "../helpers/token"
import { IUser } from "../interfaces/IUser"
import { IDream } from "../interfaces/IDream"
import { Types } from "mongoose"

export default class DreamController {
    static async getAllByUserToken(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const user: IUser = await getUserByToken(req, res)

            const dreams: IDream[] = await Dream.find({
                "user._id": user._id,
            }).lean()

            return res.status(200).json({
                message: `Foram encontrados ${dreams.length} sonhos`,
                dreams,
            })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }

    static async createByUserToken(
        req: Request,
        res: Response
    ): Promise<Response> {
        const data: IDream = req.body

        try {
            const user: IUser = await getUserByToken(req, res)

            const dream: IDream = (await Dream.create({
                name: data.name,
                description: data.description,
                user: {
                    _id: new Types.ObjectId(user._id),
                    name: user.name,
                    email: user.email,
                },
            })) as IDream

            return res.status(201).json({
                message: "Sonho criado com sucesso",
                dream,
            })
        } catch (error) {
            return res.status(500).json({
                message: "Há um erro, volte novamente mais tarde",
                error,
            })
        }
    }
}
