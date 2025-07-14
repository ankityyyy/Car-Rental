import express from "express";
import passport from "passport";
 import { generateTokenAndRedirect } from "../controller/googleauthController.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failure" }),
  generateTokenAndRedirect
);

export default router;

