export const registerUserAsync = (user) => {
	const apiURL = 'http://192.168.1.8:8000/auth/signup';
	user['date_of_birth'] = user['birthday'];

	return fetch(apiURL, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.catch((e) => {
			console.error(e);
			throw e;
		});
};
