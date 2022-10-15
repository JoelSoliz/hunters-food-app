import { useState } from 'react';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

const ImagePickerComponent = () => {
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(result);
		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View>
			<Button onPress={pickImage}>pickImage</Button>
			{image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
		</View>
	);
};

export default ImagePickerComponent;
