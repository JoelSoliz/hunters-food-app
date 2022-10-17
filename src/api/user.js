const HOST = 'https://blooming-inlet-07928.herokuapp.com';

export const getUserInfoAsync = (token) => {
	const apiURL = `${HOST}/user/me`;
	return fetch(apiURL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((e) => {
			console.error(e);
			throw e;
		});
};

export const loginAsync = (user) => {
	const apiURL = `${HOST}/auth/login`;
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

export const registerUserAsync = (user) => {
	const apiURL = `${HOST}/auth/signup`;
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
