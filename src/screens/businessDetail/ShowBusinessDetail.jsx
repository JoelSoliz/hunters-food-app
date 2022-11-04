import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import logo from '../../../assets/picture.png';
import BrowserLinking from '../../components/linking/';

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
const business = {
	name: 'Pollos campeón ',
	category: 'restaurante-familiar',
	location: 'https://maps.app.goo.gl/ssqhPPZfAd9NF5MN6',
	id_business: '0A2K',
	description: 'Pollos esquisitos ',
};
const ShowBusinessDetail = () => {
	const { colors } = useTheme();
	const [imageError, setImageError] = useState(false);
	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<View>
				<Image
					onError={() => {
						setImageError(true);
					}}
					source={
						imageError
							? image
							: {
									uri: `${API_HOST}/product/${business.id_business}/image`,
							  }
					}
					style={styles.image}
				/>
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
	},
});
