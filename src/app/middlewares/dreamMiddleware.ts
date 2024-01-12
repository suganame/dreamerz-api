import { body, param } from "express-validator"

export const dreamValidationCreate = () => {
    return [
        body("name").isString().withMessage("O nome é obrigatório"),
    ]
}

export const dreamValidationUpdate = () => {
    return [
        param("id").isMongoId().withMessage("ID não está correto"),
        body("name").isString().withMessage("O nome é obrigatório"),
    ]
}