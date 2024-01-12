import { Router } from "express"
import DreamController from "../app/controllers/Dream.controller"
import UserController from "../app/controllers/User.controller"
import { UserValidationProfile } from "../app/middlewares/userMiddleware"
import { validationMiddleware } from "../app/middlewares/validationMiddleware"

const router = Router()

router.get("/dreams", DreamController.getAllByUserToken)
router.post("/dreams", DreamController.createByUserToken)
router.get("/user/profile/", UserController.profile)
router.patch(
    "/user/profile/:id",
    UserValidationProfile(),
    validationMiddleware,
    UserController.update
)

export default router
