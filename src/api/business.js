const HOST = 'https://blooming-inlet-07928.herokuapp.com';

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
export const getBusinessAsync = (page) => {
	const apiURL = `${HOST}/business/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

