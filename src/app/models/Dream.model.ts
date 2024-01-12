import { model, Schema } from "mongoose"

export const Dream = model(
    "Dream",
    new Schema(
        {
            name: { type: String, required: true },
            description: { type: String },
            active: { type: Boolean, default: false },
            user: Object,
        },
        { timestamps: true }
    )
)
