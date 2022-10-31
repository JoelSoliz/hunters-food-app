import { convertToDate } from '../components/operaciones/fecha';

const HOST = 'https://blooming-inlet-07928.herokuapp.com';

export const getProductAsync = async (id) => {
	const apiURL = `${HOST}/product/${id}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getProductsAsync = async (page) => {
	const apiURL = `${HOST}/product/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const registerProductAsync = async (product, business_id, token) => {
	const apiURL = new URL(`${HOST}/product/register`);
	const dataList = ['name', 'description', 'product_type', 'amount', 'price', 'discount'];
	dataList.forEach((key) => apiURL.searchParams.append(key, product[key] || ''));
	apiURL.searchParams.append('id_business', business_id);
	apiURL.searchParams.append('start_time', convertToDate(product.date_start).toISOString());
	apiURL.searchParams.append('final_time', convertToDate(product.date_end).toISOString());

	let data = null;
	const imageURI = product['logo'];
	if (imageURI) {
		data = new FormData();
		const end = imageURI.endsWith('.jpeg') ? 'jpeg' : 'png';
		let image = {
			uri: product['logo'],
			name: `image.${end}`,
			type: `image/${end}`,
		};
		data.append('image', image);
	}
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
		.catch((error) => console.error(error));
};

export const update = async (product, business_id, token) => {
	const apiURL = new URL(`${HOST}/product/register`);
	const dataList = ['name', 'description', 'product_type', 'amount', 'price', 'discount'];
	dataList.forEach((key) => apiURL.searchParams.append(key, product[key] || ''));
	apiURL.searchParams.append('id_business', business_id);
	apiURL.searchParams.append('start_time', convertToDate(product.date_start).toISOString());
	apiURL.searchParams.append('final_time', convertToDate(product.date_end).toISOString());

	let data = null;
	const imageURI = product['logo'];
	if (imageURI) {
		data = new FormData();
		const end = imageURI.endsWith('.jpeg') ? 'jpeg' : 'png';
		let image = {
			uri: product['logo'],
			name: `image.${end}`,
			type: `image/${end}`,
		};
		data.append('image', image);
	}
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
		.catch((error) => console.error(error));
};
