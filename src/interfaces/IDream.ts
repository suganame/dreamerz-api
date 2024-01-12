import { Document, Types } from "mongoose"

export interface IDream extends Document {
    _id: Types.ObjectId
    name: string
    description?: string
    active?: boolean
    createdAt: Date
    updatedAt: Date
}
