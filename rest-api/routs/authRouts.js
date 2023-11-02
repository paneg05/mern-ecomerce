import  express  from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddlewares.js";
import {
	loginController,
	registerController,
	testController,
	forgotPasswordController,
	updateProfileController,
} from "../controllers/authController.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//FORGOT || POST
router.post("/forgot-password", forgotPasswordController);

//test routs
router.get("/test", requireSignIn, isAdmin, testController);

//protected user rout auth
router.get("/user-route", requireSignIn, (req, res) => {
	console.log("chegou aqui");
	res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-route", requireSignIn, isAdmin, (req, res) => {
	console.log("chegou aqui");
	res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);
export default router