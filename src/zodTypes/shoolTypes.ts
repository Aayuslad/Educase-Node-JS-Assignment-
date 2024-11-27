import zod from "zod";

export const AddSchoolPyloadSchema = zod.object({
	name: zod.string(),
	address: zod.string(),
	latitude: zod.number(),
	longitude: zod.number(),
});
