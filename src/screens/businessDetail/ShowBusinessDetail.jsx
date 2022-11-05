import { StyleSheet, View, Image, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import image from '../../../assets/picture.png';
import BrowserLinking from '../../components/linking/BrowserLinking';
import { useState } from 'react';
const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
const business = {
	name: 'Pollos campeón ',
	category: 'restaurante-familiar',
	location: 'https://maps.app.goo.gl/ssqhPPZfAd9NF5MN6',
	id_business: '0A2K',
	description: 'Pollos esquisitos ',
};
const ShowBusinessDetail = ({ route }) => {
	console.log(route.params.id);
	const { colors } = useTheme();
	const [imageError, setImageError] = useState(false);
	return (
		<View style={{ flex: 1 }}>
			<View>
				<Image
					onError={() => {
						setImageError(true);
					}}
					source={
						imageError
							? image
							: {
									uri: `${API_HOST}/business/${business.id_business}/image`,
							  }
					}
					style={styles.image}
				/>
			</View>
			<View>
				<Text>{business.name}</Text>
				<Text>{business.description}</Text>
				<Text>{business.category}</Text>
				<View>
					<BrowserLinking url={business.location} />
				</View>
			</View>
		</View>
	);
};

export default ShowBusinessDetail;

const styles = StyleSheet.create({
	view: {
		paddingTop: 20,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		display: 'flex',
	},
	image: {},
});
