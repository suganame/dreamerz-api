import { Router } from "express"
import DreamController from "../controllers/Dream.controller"

const router = Router()

router.get("/dreams", DreamController.getAllByUserToken)
router.post("/dreams", DreamController.createByUserToken)

export default router
