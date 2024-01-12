import request from "supertest"
import app from "../app"
import { User } from "../app/models/User.model"
import bcrypt from "bcrypt"
import { afterAll, describe, expect, it } from "vitest"

describe("UserController", () => {
    afterAll(async () => {
        await User.deleteOne({
            email: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo@example.com",
        })
    })

    it("should register a new user", async () => {
        const userData = {
            email: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo@example.com",
            password: "password123",
            confirmPassword: "password123",
            name: "Test User",
        }

        const response = await request(app)
            .post("/register")
            .send(userData)
            .expect(201)

        expect(response.body.message).toContain(
            "Usuário Test User criado com sucesso!"
        )
        expect(response.body.token).toBeDefined()

        const user = await User.findOne({ email: userData.email })
        expect(user).toBeTruthy()

        const isPasswordValid = await bcrypt.compare(
            userData.password,
            user!.password
        )
        expect(isPasswordValid).toBe(true)
    })

    it("should return 422 for duplicate email", async () => {
        const duplicateUserData = {
            email: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo@example.com",
            password: "password456",
            confirmPassword: "password456",
            name: "Duplicate User",
        }

        const response = await request(app)
            .post("/register")
            .send(duplicateUserData)
            .expect(422)

        expect(response.body.message).toContain(
            "Por favor, utilize outro e-mail"
        )
    })

    it("should return 422 for password mismatch", async () => {
        const mismatchedPasswordData = {
            email: "mismatched@example.com",
            password: "password123",
            confirmPassword: "password456",
            name: "Mismatched User",
        }

        const response = await request(app)
            .post("/register")
            .send(mismatchedPasswordData)
            .expect(422)

        expect(response.body.message).toContain(
            "A confirmação de senha precisa ser igual a senha"
        )
    })
})
