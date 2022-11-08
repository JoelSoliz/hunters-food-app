import { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';

import image from '../../../assets/comida.png';

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';

const Business = ({ value, onSelect }) => {
	const [imageError, setImageError] = useState(false);

	const locations = async () => {
		const supportedURL = value.location;
		await Linking.openURL(supportedURL);
	};

	return (
		<TouchableOpacity onPress={() => onSelect(value.id_business)}>
			<View style={styles.card}>
				<View style={styles.logoContainer}>
					<Image
						onError={() => {
							setImageError(true);
						}}
						source={
							imageError
								? image
								: {
										uri: `${API_HOST}/business/${value.id_business}/image`,
								  }
						}
						style={styles.logo}
					/>
				</View>
				<View style={styles.mainContainer}>
					<Text
						style={{
							...styles.text,
							fontSize: 18,
						}}
					>
						{value.name}
					</Text>
					<Text
						style={{
							...styles.subText,
							fontSize: 15,
							marginTop: 10,
							textAlign: 'right',
						}}
					>
						Ubicación
						<AntDesing
							name='enviroment'
							onPress={locations}
							style={{ fontSize: 25, color: '#F97316' }}
						/>
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Business;

const styles = StyleSheet.create({
	locations: {
		alignItems: 'center',
	},
	locationsContainer: {
		marginRight: 10,
		marginTop: 20,
	},
	card: {
		backgroundColor: '#474747',
		borderColor: '#F97316',
		borderRadius: 15,
		borderWidth: 1,
		height: 130,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 5,
	},
	logo: {
		height: 100,
		width: '100%',
		borderRadius: 10,
	},
	logoContainer: {
		alignItems: 'center',
		marginLeft: 10,
		marginVertical: 15,
		width: 100,
	},
	mainContainer: {
		flexGrow: 2,
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	text: {
		color: '#fff',
	},
	subText: {
		color: '#B0AFAF',
	},
});
