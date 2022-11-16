import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import AntDesing from 'react-native-vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';

import image from '../../../assets/comida.png';
import fecha from '../operaciones/fecha.js';

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';

const Product = ({ value, isOwner, onEdit, onSelect }) => {
	const [imageError, setImageError] = useState(false);
	const theme = useTheme();

	return (
		<TouchableOpacity onPress={() => onSelect(value.id_product)}>
			<View style={styles.card}>
				<View style={styles.content}>
					<View style={styles.imageContainer}>
						<Image
							onError={() => {
								setImageError(true);
							}}
							source={
								imageError
									? image
									: {
											uri: `${API_HOST}/product/${value.id_product}/image`,
									  }
							}
							style={styles.image}
						/>
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
						<AntDesing
							name='shoppingcart'
							style={{ fontSize: 25, color: theme.colors.primary }}
						/>
						<Text
							style={{
								...styles.text,
								fontSize: 15,
							}}
						>
							Bs. {value.price}
						</Text>
						<Text></Text>
						{isOwner && (
							<View
								style={{
									flexDirection: 'column',
									marginTop: 10,
								}}
							>
								<AntDesing
									name='edit'
									style={{ fontSize: 25, color: '#1687F0', marginBottom: 5 }}
									onPress={() => onEdit(value.id_product)}
								/>
								<Feather
									name='trash-2'
									style={{ fontSize: 25, color: theme.colors.error }}
									onPress={() => onEdit(value.id_product)}
								/>
							</View>
						)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Product;

const styles = StyleSheet.create({
	buy: {
		alignItems: 'center',
	},
	buyContainer: {
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
