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
		.catch((error) => console.log(error.sourceURL));
};
export const getBusinessAsync = (page) => {
	const apiURL = `${HOST}/business/?current_page=${page}`;
	return fetch(apiURL)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};


// export const registerBusinessAsync = async (business, token) => {
// 	const myHeaders = new Headers();
// 	myHeaders.append(
// 		'Authorization',
// 		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjYxMjcwODIsInN1YiI6ImpvZWxzb2xpemNob3F1ZUBnbWFpbC5jb20ifQ.yL_ogB8mQFe6ozC62uoeNOdJY-ixATFU2fADY0bvBN8'
// 	);
// 	myHeaders.append('Content-Type', 'multipart/form-data');
// 	// const image = await fetch(business['logo']).then((response) => response.blob());
// 	const imageURI = business['logo'];
// 	console.log(imageURI);
// 	const end = imageURI.endsWith('.jpeg') ? 'jpeg' : 'png';
// 	console.log(end);
// 	const formdata = new FormData();
// 	formdata.append('image_logo', {
// 		uri: business['logo'],
// 		name: `image.${end}`,
// 		type: `image/${end}`,
// 	});

// 	var requestOptions = {
// 		method: 'POST',
// 		headers: myHeaders,
// 		body: formdata,
// 		redirect: 'follow',
// 	};
// 	return fetch(
// 		'https://blooming-inlet-07928.herokuapp.com/business/register?name=Ramm&category=reposteria&location=https%3A%2F%2Fmaps.google.com%2F%3Fcid%3D11712889520272513183%26entry%3Dgps&descriptionn=Testing%20aaaaa',
// 		requestOptions
// 	)
// 		.then((response) => response.json())
// 		.then((response) => {
// 			console.log(response);
// 			return response;
// 		})
// 		.catch((error) => console.log('error', error));
// };
