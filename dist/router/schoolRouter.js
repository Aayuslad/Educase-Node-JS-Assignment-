"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolController_1 = require("../controller/schoolController");
const router = (0, express_1.Router)();
// everything is correct still getting type error (not sure why, same code working in my previous project)
//@ts-ignore
router.post("/addSchool", schoolController_1.addSchool);
///@ts-ignore
router.get("/listSchools", schoolController_1.listSchools);
exports.default = router;
