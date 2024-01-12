import { Router } from "express"
import UserController from "../controllers/User.controller"

const router = Router()

router.post("/register", UserController.create)

export default router
