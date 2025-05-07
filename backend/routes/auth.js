import express from "express";
import {singIn, singUp} from "../controllers/auth.js";

const router = express.Router();

router.post("/sing-in", singIn)
router.post("/sing-up", singUp)

export default router;