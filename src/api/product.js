const HOST = 'https://blooming-inlet-07928.herokuapp.com';

export const getProductAsync = (page) => {
	const apiURL = `${HOST}/product/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};
