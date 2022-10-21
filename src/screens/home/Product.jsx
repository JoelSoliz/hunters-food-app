import { Image, StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import AntDesing from 'react-native-vector-icons/AntDesign';

import image from '../../../assets/comida.png';
import fecha from '../../components/operaciones/fecha.js';

const Product = ({ value }) => {
	return (
		<View style={styles.card}>
			<View style={styles.content}>
				<View style={styles.imageContainer}>
					<Image source={image} style={styles.image} />
					<Text
						style={{
							...styles.subText,
							fontSize: 12,
						}}
					>
						Expira en {fecha(value)} días
					</Text>
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
					<View style={{ flexDirection: 'row' }}>
						<Chip
							compact={true}
							mode='outlined'
							textStyle={{ ...styles.subText, fontSize: 12 }}
							style={{
								backgroundColor: '#FFAE8050',
								marginVertical: 5,
							}}
						>
							{value.product_type}
						</Chip>
					</View>
					<Text
						style={{
							...styles.subText,
							fontSize: 12,
						}}
					>
						Cantidad: {value.amount}
						{'\n'}
						Descuento: {value.discount}%
					</Text>
				</View>
			</View>
			<View style={styles.buyContainer}>
				<View style={styles.buy}>
					<AntDesing name='shoppingcart' style={{ fontSize: 25, color: '#F97316' }} />
					<Text
						style={{
							...styles.text,
							fontSize: 15,
						}}
					>
						Bs. {value.price}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Product;

const styles = StyleSheet.create({
	buy: {
		alignItems: 'center',
	},
	buyContainer: {
		// alignItems: 'flex-end',
		marginRight: 10,
		marginTop: 20,
	},
	card: {
		backgroundColor: '#474747',
		borderColor: '#F97316',
		borderRadius: 15,
		borderWidth: 1,
		height: 150,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginVertical: 5,
	},
	content: {
		flexDirection: 'row',
	},
	image: {
		height: 90,
		width: '90%',
		borderRadius: 10,
	},
	imageContainer: {
		alignItems: 'center',
		marginLeft: 10,
		marginVertical: 20,
	},
	mainContainer: {
		marginHorizontal: 15,
		marginVertical: 20,
	},
	text: {
		color: '#fff',
	},
	subText: {
		color: '#B0AFAF',
	},
});
