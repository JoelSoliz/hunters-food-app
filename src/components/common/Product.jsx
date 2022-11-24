import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { deleteProduct, productsSelector } from '../../redux/slices/product';
import image from '../../../assets/comida.png';
import fecha from '../operaciones/fecha.js';
import ConfirmationModal from './ConfirmationModal';

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';

const Product = ({ value, isOwner, onEdit, onSelect }) => {
	const [imageError, setImageError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { deleting } = useSelector(productsSelector);
	const dispatch = useDispatch();
	const theme = useTheme();

	useEffect(() => {
		if (!deleting) {
			setShowModal(false);
		}
	}, [deleting]);

	const onDelete = () => {
		if (!deleting) {
			dispatch(deleteProduct(value.id_product));
		}
	};

	return (
		<>
			{showModal ? (
				<ConfirmationModal
					isOpen={showModal}
					message={'¿Esta seguro de eliminar el producto?'}
					onCancel={() => setShowModal(false)}
					onConfirm={onDelete}
				/>
			) : null}
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
									fontSize: 15,
									width: 130,
								}}
							>
								{value.name}
							</Text>
							<View style={{ flexDirection: 'row', position: 'absolute', top: 55 }}>
								<Chip
									compact={true}
									mode='outlined'
									textStyle={{
										...styles.subText,
										fontSize: 12,
										marginVertical: -2,
									}}
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
									position: 'absolute',
									top: 85,
								}}
							>
								Cantidad: {value.amount}
								{'\n'}
								Descuento: {Math.round(value.discount * 100) / 100}%
							</Text>
						</View>
					</View>
					<View style={styles.buyContainer}>
						<View style={styles.buy}>
							<AntDesign
								name='shoppingcart'
								style={{ fontSize: 25, left: 5, color: theme.colors.primary }}
							/>
							<View style={{ flex: 1, alignItems: 'center', left: -25, width: 75 }}>
								<Text
									style={{
										...styles.text,
										fontSize: 12,
									}}
								>
									Bs. {Math.round(value.price * 100) / 100}
								</Text>
							</View>
							{isOwner && (
								<View
									style={{
										flexDirection: 'column',
										marginTop: 10,
									}}
								>
									<AntDesign
										name='edit'
										style={{ fontSize: 25, color: '#1687F0', marginBottom: 5 }}
										onPress={() => onEdit(value.id_product)}
									/>
									<Feather
										name='trash-2'
										style={{ fontSize: 25, color: theme.colors.error }}
										onPress={() => setShowModal(true)}
									/>
								</View>
							)}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	buy: {
		position: 'absolute',
		left: -43,
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

export default Product;
