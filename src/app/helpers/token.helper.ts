import { Request, Response } from "express"
import { IUser } from "../interfaces/User.interface"
import { User } from "../models/User.model"
import { Types } from "mongoose"
const jwt = require("jsonwebtoken")

interface DecodedToken {
    id: Types.ObjectId
}

export const createToken = async (
    user: IUser,
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const token = await jwt.sign(
            {
                name: user.name,
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "60m" }
        )

        return res.status(201).json({ message: "Você está autenticado", token })
    } catch (error) {
        return res.status(500).json({
            message: "Houve um erro na autenticação",
            error,
        })
    }
}

export const getUserByToken = async (
    req: Request,
    res: Response
): Promise<IUser | boolean> => {
    const token: string = req.headers.authorization!.split(" ")[1]

    if (!token) {
        return false
    }

    const decoded: DecodedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    const userId: Types.ObjectId = decoded.id

    return (await User.findOne({ _id: userId })) as IUser
}
