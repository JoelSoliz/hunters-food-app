import { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
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
			<Button
				style={styles.button}
				onPress={pickImage}
				//mode='contained'
			>
				<Text style={styles.texto}>Seleccionar logo</Text>
			</Button>
			{image && <Image source={{ uri: image }} style={styles.logo} />}
		</View>
	);
};
const styles = StyleSheet.create({
	button: {
		marginVertical: 5,
		backgroundColor: '#52525240 !important',
		borderColor: 'gray',
		borderWidth: 1.2,
		borderRadius: 15,
		marginVertical: 10,
	},
	texto: {
		color: 'gray',
	},

	logo: {
		width: 150,
		height: 150,
		borderRadius: 20,
		marginHorizontal: 70,
		marginVertical: 5,
	},
});

export default ImagePickerComponent;
