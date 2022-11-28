const HOST = 'https://hunters-food-api-sco3ixymzq-ue.a.run.app';

export const getBusinessAsync = async (id) => {
	const apiURL = `${HOST}/business/${id}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getBusinessProductsAsync = async (id, page) => {
	const apiURL = `${HOST}/business/${id}/products?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getBusinessesAsync = async (page) => {
	const apiURL = `${HOST}/business/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const registerBusinessAsync = async (business, token) => {
	const url = `${HOST}/business/register`;
	const apiURL = new URL(url);
	const dataList = ['name', 'category', 'location', 'descriptionn'];
	dataList.forEach((key) => apiURL.searchParams.append(key, business[key]));

	const imageURI = business['logo'];
	const end = imageURI.endsWith('.jpeg') ? 'jpeg' : 'png';
	const data = new FormData();
	data.append('image_logo', {
		uri: business['logo'],
		name: `image.${end}`,
		type: `image/${end}`,
	});

	let urlStr = apiURL.toString();
	urlStr = urlStr.replace('register/', 'register');
	return fetch(urlStr, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		mode: 'cors',
		body: data,
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const addFavoriteBusinessAsync = async (business_id, token) => {
	const apiURL = new URL(`${HOST}/business/add_favorite?id_business=${business_id}`);
	
	return fetch(apiURL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		mode: 'cors',
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
};