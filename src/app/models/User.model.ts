import { model, Schema } from "mongoose"

export const User = model(
    "User",
    new Schema(
        {
            email: { type: String, required: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
        },
        { timestamps: true }
    )
)
