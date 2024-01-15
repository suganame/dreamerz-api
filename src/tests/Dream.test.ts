import request from "supertest";
import { Dream } from "../app/models/Dream.model";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { User } from "../app/models/User.model";
// import { serverStart, serverStop } from "./mocks/express.mock"

// let server: any

import server from "../server";

describe("DreamController()", () => {
  beforeAll(async () => {
    await Dream.deleteOne({
      name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
    });

    await User.deleteOne({
      email: "92j8f89123jf8923jfj8923fj89@example.com",
    });
  });

  afterAll(async () => {
    await Dream.deleteOne({
      name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
    });

    await User.deleteOne({
      email: "92j8f89123jf8923jfj8923fj89@example.com",
    });
  });

  const registerUser = async () => {
    return request(server)
      .post("/register")
      .send(
        await {
          name: "Test",
          email: "92j8f89123jf8923jfj8923fj89@example.com",
          password: "2Qj!@fj%89@N23fF89",
          confirmPassword: "2Qj!@fj%89@N23fF89",
        }
      );
  };

  it("should create a dream successfully", async () => {
    const dreamData = {
      name: "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjo",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo odio ipsa aliquam fuga quod, exercitationem nisi id, dolore libero voluptates voluptate. Magnam quibusdam cupiditate, consequuntur numquam ex ab fuga qui.",
    };

    const user = await registerUser();

    const token = user.body.token;

    const response = await request(server)
      .post("/dashboard/dreams")
      .set({ Authorization: `Bearer ${token}` })
      .send(dreamData)
      .expect(201);

    const dream = await Dream.findOne({
      name: dreamData.name,
    }).lean();

    expect(dream).toBeTruthy();
    expect(response.body.message).toContain("Sonho criado com sucesso");
    expect(response.body.dream).toBeDefined();
  });
});
