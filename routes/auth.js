import { Router } from "express";

import { signUpController, signInController } from "../controllers/user.js";
import { validate } from "../validators/zodValidator.js";
import { userSignUpSchema, userSignInSchema } from "../validators/userSchema.js";
import { googleAuthController } from "../controllers/user.js";
const router = Router();

router.post("/signup",validate(userSignUpSchema), signUpController);
router.post("/signin",validate(userSignInSchema), signInController);
router.get("/google", googleAuthController);
export default router;