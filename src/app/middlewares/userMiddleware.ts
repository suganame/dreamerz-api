import { body } from "express-validator"

export const UserValidationProfile = () => {
    return [
        body("name").isString().withMessage("O nome é obrigatório"),
        body("email").isEmail().withMessage("O e-mail é obrigatório"),
        body("password")
            .isStrongPassword()
            .withMessage("A senha não é forte o suficiente")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 8 })
            .withMessage("A senha precisa ter no mínimo 8 caracteres"),
    ]
}

export const UserValidationLogin = () => {
    return [
        body("email").isEmail().withMessage("O e-mail é obrigatório"),
        body("password").isString().withMessage("A senha é obrigatória"),
    ]
}
