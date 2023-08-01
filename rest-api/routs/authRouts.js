import  express  from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddlewares.js";
import {loginController, registerController,testController} from "../controllers/authController.js";
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST


router.post('/register',registerController)

//LOGIN || POST
router.post('/login', loginController)

//test routs
router.get('/test',requireSignIn, isAdmin, testController)

//protected rout auth
router.get('/user-route', requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
export default router