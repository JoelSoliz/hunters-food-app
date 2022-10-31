const HOST = 'https://blooming-inlet-07928.herokuapp.com';

export const getProductAsync = (page) => {
	const apiURL = `${HOST}/product/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const registerProductAsync = (product, business_id, token) => {
	const apiURL = `${HOST}/product/register`;
	const dataList = ['name', 'product_type', 'amount', 'price', 'discount'];
	dataList.forEach((key) => apiURL.searchParams.append(key, product[key]));
	apiURL.searchParams.append('id_business', business_id);

	const imageURI = business['logo'];
	const end = imageURI.endsWith('.jpeg') ? 'jpeg' : 'png';
	const data = new FormData();
	data.append('image', {
		uri: product['logo'],
		name: `image.${end}`,
		type: `image/${end}`,
	});

	let urlStr = apiURL.toString();
	urlStr = urlStr.replace('register/', 'register');

	return fetch(apiURL, {
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
