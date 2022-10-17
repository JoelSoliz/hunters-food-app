import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import logo from '../../../assets/picture.png';

const ImagePickerComponent = ({ onChange, value }) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			onChange(result.uri);
		}
	};

	return (
		<View>
			<Button style={styles.button} onPress={pickImage} mode='outlined'>
				<Text style={styles.texto}>Seleccionar imagen</Text>
			</Button>
			<View style={styles.container}>
				{value ? (
					<Image source={{ uri: value }} style={styles.logo} />
				) : (
					<Image source={logo} style={styles.logo} />
				)}
			</View>
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
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
});

export default ImagePickerComponent;
