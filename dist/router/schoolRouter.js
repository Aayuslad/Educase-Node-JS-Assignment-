"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/addSchool");
router.get("/listSchools/:latitude/:longitude");
exports.default = router;
