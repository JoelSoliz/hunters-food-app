export const registerUserAsync = (user) => {
	const apiURL = 'https://blooming-inlet-07928.herokuapp.com/auth/signup';
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
