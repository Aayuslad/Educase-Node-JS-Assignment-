"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSchools = exports.addSchool = void 0;
const client_1 = require("@prisma/client");
const haversineDistanceFunction_1 = require("../utils/haversineDistanceFunction");
const shoolTypes_1 = require("../zodTypes/shoolTypes");
const prisma = new client_1.PrismaClient();
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Validate request data
        const parced = shoolTypes_1.AddSchoolPyloadSchema.safeParse(req.body);
        if (!parced.success) {
            return res.status(422).json({ message: "invalid request parameters" });
        }
        // Step 2: Extract validated data
        const { name, address, latitude, longitude } = parced.data;
        // Step 3: Create school entry in database
        yield prisma.schools.create({
            data: {
                name,
                address,
                latitude,
                longitude,
            },
        });
        // Step 4: Return success response
        return res.status(200).json({ message: "school added" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.addSchool = addSchool;
const listSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Get query parameters and validate
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "latitude and longitude are required" });
    }
    try {
        // Step 2: Fetch schools and validate
        const schools = yield prisma.schools.findMany();
        if (!schools.length) {
            return res.status(404).json({ message: "no schools found" });
        }
        // Step 3: Parse coordinates
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ message: "invalid latitude or longitude format" });
        }
        // step 4: calculate distance and sort schools
        const schoolsWithDistance = schools.map((school) => (Object.assign(Object.assign({}, school), { distance: (0, haversineDistanceFunction_1.calculateDistance)(lat, lng, school.latitude, school.longitude) })));
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        // Step 5: return results
        return res.status(200).json(sortedSchools);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.listSchools = listSchools;
