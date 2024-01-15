import request from "supertest"
const { createServer } = require("http")
import app from "../app"
import { Dream } from "../app/models/Dream.model"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { User } from "../app/models/User.model"

let server: any

describe("DreamController()", () => {
    beforeAll(async (done) => {
        server = await createServer(app)
        await server.listen(0, done)

        await Dream.deleteOne({
            name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
        })

        await User.deleteOne({
            email: "92j8f89123jf8923jfj8923fj89@example.com",
        })
    })

    afterAll(async (done) => {
        await Dream.deleteOne({
            name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
        })

        await User.deleteOne({
            email: "92j8f89123jf8923jfj8923fj89@example.com",
        })

        await server.close(done)
    })

    it("should create a dream successfully", async () => {
        const dreamData = {
            name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo odio ipsa aliquam fuga quod, exercitationem nisi id, dolore libero voluptates voluptate. Magnam quibusdam cupiditate, consequuntur numquam ex ab fuga qui.",
        }

        const userData = {
            name: "Test",
            email: "92j8f89123jf8923jfj8923fj89@example.com",
            password: "2Qj!@fj%89@N23fF89",
            confirmPassword: "2Qj!@fj%89@N23fF89",
        }

        const user = await request(server).post("/register").send(userData)
        const token = user.body.token

        const response = await request(server)
            .post("/dashboard/dreams")
            .set({ Authorization: `Bearer ${token}` })
            .send(dreamData)
            .expect(201)

        const dream = await Dream.findOne({
            name: dreamData.name,
        }).lean()

        expect(dream).toBeTruthy()
        expect(response.body.message).toContain("Sonho criado com sucesso")
        expect(response.body.dream).toBeDefined()
    })
})
