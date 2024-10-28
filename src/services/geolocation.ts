import axios from "axios"

export const getGeolocation = async (address: string) => {
	const response = await axios.get(
		`https://nominatim.openstreetmap.org/search`,
		{
			params: {
				q: address,
				format: "json",
			},
		},
	)

	const location = response.data[0]
	return {
		latitude: parseFloat(location.lat),
		longitude: parseFloat(location.lon),
	}
}
