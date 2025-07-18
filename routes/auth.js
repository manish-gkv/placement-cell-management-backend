import { Router } from "express";

import { signUpController, signInController } from "../controllers/user.js";
import { validate } from "../validators/zodValidator.js";
import { userSignUpSchema, userSignInSchema } from "../validators/userSchema.js";
const router = Router();

router.post("/signup",validate(userSignUpSchema), signUpController);
router.post("/signin",validate(userSignInSchema), signInController);

export default router;