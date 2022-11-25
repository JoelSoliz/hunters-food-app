import { convertToDate } from '../components/operaciones/fecha';

const HOST = 'https://hunters-food-api-sco3ixymzq-ue.a.run.app';

export const deleteProductAsync = async (id, token) => {
	const apiURL = `${HOST}/product/${id}`;
	return fetch(apiURL, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getProductAsync = async (id) => {
	const apiURL = `${HOST}/product/${id}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getProductsAsync = async (page, filter) => {
	const apiURL = `${HOST}/product/?current_page=${page}&product_type=${filter?.category}`;
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

export const updateProductAsync = async (idProduct, idBusiness, product, token) => {
	const apiURL = new URL(`${HOST}/product/${idProduct}`);
	const dataList = ['name', 'description', 'product_type', 'amount', 'price', 'discount'];
	dataList.forEach((key) => apiURL.searchParams.append(key, product[key] || ''));
	apiURL.searchParams.append('id_business', idBusiness);
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
			type: `image/*`,
		};
		data.append('image', image);
	}
	let urlStr = apiURL.toString();
	urlStr = urlStr.replace(`${idProduct}/`, idProduct);

	return fetch(urlStr, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		mode: 'cors',
		body: data,
	})
		.then((response) => response.json())
		.catch((error) => console.error(error));
};
