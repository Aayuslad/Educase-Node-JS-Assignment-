const R = 6371; // Earth's radius in kilometers

// Haversine Distance Function
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const toRad = (angle: number) => (Math.PI / 180) * angle; // Convert degrees to radians

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in kilometers
}
