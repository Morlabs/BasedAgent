import axios from 'axios';

export async function getUserDetails(accessToken) {
	try {
		const response = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching user details:', error);
		return null;
	}
}
