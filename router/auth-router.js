const express=require("express")
const router=express.Router();
const authcontrollers=require("../controllers/auth-controllers")

router.route("/").get(authcontrollers.home)

router.route("/register")
  .get((req, res) => res.send("This is the registration form"))
  .post(authcontrollers.register);

router.route("/login")
  .get((re,res)=>res.send("This is the login page"))
  .post(authcontrollers.login);

module.exports=router;