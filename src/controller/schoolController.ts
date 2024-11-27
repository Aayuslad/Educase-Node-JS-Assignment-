import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { calculateDistance } from "../utils/haversineDistanceFunction";
import { AddSchoolPyloadSchema } from "../zodTypes/shoolTypes";
const prisma = new PrismaClient();

export const addSchool = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Step 1: Validate request data
		const parced = AddSchoolPyloadSchema.safeParse(req.body);
		if (!parced.success) {
			return res.status(422).json({ message: "invalid request parameters" });
		}

		// Step 2: Extract validated data
		const { name, address, latitude, longitude } = parced.data;

		// Step 3: Create school entry in database
		await prisma.schools.create({
			data: {
				name,
				address,
				latitude,
				longitude,
			},
		});

		// Step 4: Return success response
		return res.status(200).json({ message: "school added" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "internal server error" });
	}
};

export const listSchools = async (req: Request, res: Response): Promise<Response> => {
	// Step 1: Get query parameters and validate
	const { latitude, longitude } = req.query;
	if (!latitude || !longitude) {
		return res.status(400).json({ message: "latitude and longitude are required" });
	}

	try {
		// Step 2: Fetch schools and validate
		const schools = await prisma.schools.findMany();

		if (!schools.length) {
			return res.status(404).json({ message: "no schools found" });
		}

		// Step 3: Parse coordinates
		const lat = parseFloat(latitude as string);
		const lng = parseFloat(longitude as string);

		if (isNaN(lat) || isNaN(lng)) {
			return res.status(400).json({ message: "invalid latitude or longitude format" });
		}

		// step 4: calculate distance and sort schools
		const schoolsWithDistance = schools.map((school) => ({
			...school,
			distance: calculateDistance(lat, lng, school.latitude, school.longitude),
		}));
		const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

		// Step 5: return results
		return res.status(200).json(sortedSchools);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "internal server error" });
	}
};