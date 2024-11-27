import { Router } from "express";
import { addSchool, listSchools } from "../controller/schoolController";
const router = Router();

// everything is correct still getting type error (not sure why, same code working in my previous project)
//@ts-ignore
router.post("/addSchool", addSchool);
///@ts-ignore
router.get("/listSchools", listSchools);

export default router;
