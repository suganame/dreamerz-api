import { Request, Response } from "express"
import { IUser } from "../interfaces/IUser"
import { User } from "../models/User"
import { Types } from "mongoose"
const jwt = require("jsonwebtoken")

interface DecodedToken {
    id: Types.ObjectId
}

export const createToken = (user: IUser, req: Request, res: Response) => {
    try {
        const token = jwt.sign(
            {
                name: user.name,
                id: user._id,
            },
            process.env.JWT_SECRET
        )

        res.status(200).json({
            message: "Você está autenticado",
            token: token,
            userId: user._id,
        })
    } catch (error) {
        res.status(200).json({
            message: "Houve um erro na autenticação",
            error,
        })
    }
}

export const getUserByToken = async (
    req: Request,
    res: Response
): Promise<IUser> => {
    const token: string = req.headers.authorization!.split(" ")[1]
    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId: Types.ObjectId = decoded.id

    if (!token) {
        res.status(401).json({ message: "Acesso Negado!" })
    }

    return (await User.findOne({ _id: userId })) as IUser
}
