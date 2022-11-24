import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

import { Chip } from 'react-native-paper';
import { getProduct, productsSelector } from '../../redux/slices/product';
import { useDispatch, useSelector } from 'react-redux';
import image from '../../../assets/comida.png';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetail = ({ route }) => {
	const descuento = () => {
		let porcentaje = selectedProduct?.discount / 100;
		let des = selectedProduct?.price * porcentaje;
		let nuevoPrecio = selectedProduct?.price - des;
		return nuevoPrecio.toString();
	};
	const formatTime = (time) => {
		return ('0' + (time || '0')).slice(-2);
	};

	const formatDatetime = (datetime) => {
		const dt = new Date(datetime);
		return `${dt?.toLocaleDateString()}      ${formatTime(dt?.getHours())}:${formatTime(
			dt?.getMinutes()
		)}`;
	};
	const { loading } = useSelector(productsSelector);
	const { selectedProduct } = useSelector(productsSelector);
	const dispatch = useDispatch();
	const [imageError, setImageError] = useState(false);
	const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
	useEffect(() => {
		dispatch(getProduct(route.params.id));
	}, []);
	useEffect(() => {
		console.log(selectedProduct);
	}, [selectedProduct]);
	return (
		<ScrollView style={styles.container}>
			{loading === 'pending' ? (
				<View style={styles.center}>
					<Text style={styles.text}>Cargando los detalles del producto...</Text>
				</View>
			) : (
				<View>
					<Image
						onError={() => {
							setImageError(true);
						}}
						source={
							imageError
								? image
								: {
										uri: `${API_HOST}/product/${selectedProduct?.id_product}/image`,
								  }
						}
						style={styles.image}
					/>
					<View style={styles.priceContainer}>
						<View style={styles.buy}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									textAlignVertical: 'center',
								}}
							>
								<Ionicons
									name='fast-food-outline'
									style={{ fontSize: 35, color: '#F97316', left: 25 }}
								/>
								<Text
									style={{
										fontSize: 28,
                    left: 25,
										color: '#F97316',
										fontWeight: 'bold',
									}}
								>
									{selectedProduct?.discount} %
								</Text>
							</View>

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									textAlignVertical: 'center',
								}}
							>
								<Text
									style={{
										...styles.subText,
                    left: 30,
									}}
								>
									Antes:
								</Text>
								<Text
									style={{
										...styles.subText,
										textDecorationLine: 'line-through',
										marginLeft: 20,
                    left: 20,
									}}
								>
									{selectedProduct?.price} Bs
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									textAlignVertical: 'center',
								}}
							>
								<Text
									style={{
										...styles.subText,
                    left: 38,
									}}
								>
									Ahora:
								</Text>
								<Text
									style={{
										fontSize: 20,
								    color: '#fff',
							    	fontWeight: 'bold',
							    	marginLeft: 20,
							    	left: 20,
									}}
								>
									{descuento()} Bs
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.leftContainer}>
						<Text
							style={{
								marginBottom: 10,
								fontSize: 27,
								color: '#fff',
								backgroundColor: '#282928',
								width: '60%',
								height: 120,
								paddingVertical: 10,
								borderRadius: 5,
								fontWeight: 'bold',
								marginLeft: 20,
								left: 20,

							}}
						>
							{selectedProduct?.name}
						</Text>

					</View>
				</View>
			</View>
			<View style={styles.leftContainer}>
				<Text
					style={{
						marginBottom: 10,
						fontSize: 25,
						color: '#fff',
						backgroundColor: '#282928',
						top: 22,
						left: -20,
						width: '60%',
						height: 120,
						paddingVertical: 10,
						borderRadius: 5,
						fontWeight: 'bold',
					}}
				>
					{selectedProduct?.name}
				</Text>
				<View style={{ top: 0 }}>
					<View style={{ alignItems: 'flex-start' }}>
						<Chip
							compact={true}
							mode='outlined'
							style={{
								fontSize: 15,
								color: '#fff',
								fontWeight: 'bold',
								width: '45%',
								height: 35,
								alignItems: 'center',
								backgroundColor: '#52525240',
								borderRadius: 10,
								top: 10,
							}}
						>
							{selectedProduct?.product_type}
						</Chip>
					</View>



							<View style={{ alignItems: 'flex-end' }}>
								<Chip
									compact={true}
									mode='outlined'
									style={{
										fontSize: 15,
										color: '#fff',
										fontWeight: 'bold',
										width: '45%',
										height: 35,
										alignItems: 'center',
										backgroundColor: '#52525240',
										borderRadius: 10,
										marginLeft: 20,
										top: -25,
									}}
								>
									{selectedProduct?.business}
								</Chip>
							</View>

							<View
								style={{
									top: 10,
									marginVertical: 10,
									flexDirection: 'row',
								}}
							>
								<Text
									style={{
										fontSize: 17,
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									Cantidad disponible:
								</Text>
								<Text
									style={{
										fontSize: 20,
										color: '#fff',
										marginLeft: 20,
									}}
								>
									{selectedProduct?.amount}
								</Text>
							</View>
							<View
								style={{
									top: 10,
									marginVertical: 10,
									flexDirection: 'row',
								}}
							>
								<Text
									style={{
										fontSize: 17,
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									Inicio del descuento:
								</Text>
								<Text
									style={{
										fontSize: 15,
										color: '#fff',
										marginLeft: 20,
									}}
								>
									{formatDatetime(selectedProduct?.start_time)} hrs
								</Text>
							</View>
							<View
								style={{
									top: 10,
									marginVertical: 10,
									flexDirection: 'row',
								}}
							>
								<Text
									style={{
										fontSize: 17,
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									Fin del descuento:
								</Text>
								<Text
									style={{
										fontSize: 15,
										color: '#fff',
										marginLeft: 20,
									}}
								>
									{formatDatetime(selectedProduct?.final_time)} hrs
								</Text>
							</View>

							<View style={{ flexDirection: 'column', marginVertical: 10, top: 10 }}>
								<Text
									style={{
										fontSize: 17,
										color: '#fff',
										fontWeight: 'bold',
									}}
								>
									Descripción:
								</Text>
								<Card>
									<Text
										style={{
											marginBottom: 10,
											marginVertical: 10,
											fontSize: 17,
											color: '#fff',
											backgroundColor: '#222222',
											width: '100%',
											height: 100,
											paddingHorizontal: 10,
											paddingVertical: 10,
											borderRadius: 5,
										}}
									>
										{selectedProduct?.description}
									</Text>
								</Card>
							</View>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	buy: {
		alignItems: 'center',
	},
	priceContainer: {
		marginRight: 20,
		marginTop: 10,
		alignItems: 'flex-end',
	},
	leftContainer: {
		marginLeft: 20,
		marginRight: 20,
		marginTop: -120,
		marginVertical: 5,
	},
	image: {
		height: 300,
		width: '100%',
		borderRadius: 10,
	},
	subText: {
		color: '#fff',
		fontSize: 17,
	},
});
export default ProductDetail;
