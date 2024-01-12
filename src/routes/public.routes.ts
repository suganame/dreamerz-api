import { Router } from "express"
import UserController from "../app/controllers/User.controller"

const router = Router()

router.post("/register", UserController.create)

export default router
