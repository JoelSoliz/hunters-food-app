import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
		<View style={styles.container}>
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
			<Ionicons
				name='fast-food-outline'
				style={{ fontSize: 60, color: '#F97316', marginVertical: 10, left: 240 }}
			/>
			<Text style={styles.title}>{selectedProduct?.name}</Text>
			<Text
				style={{
					...styles.subText,
					marginVertical: 100,
					left: 260,
				}}
			>
				Antes:
			</Text>
			<Text
				style={{
					...styles.subText,
					textDecorationLine: 'line-through',
					left: 320,
					marginVertical: -120,
				}}
			>
				{selectedProduct?.price} bs
			</Text>
			<Text
				style={{
					...styles.subText,
					marginVertical: 130,
					left: 260,
				}}
			>
				Ahora:
			</Text>
			<Text
				style={{
					fontSize: 20,
					left: 320,
					marginVertical: -155,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				{descuento()} bs
			</Text>
			<Text
				style={{
					fontSize: 28,
					left: 310,
					marginVertical: 35,
					color: '#F97316',
					fontWeight: 'bold',
				}}
			>
				- {selectedProduct?.discount} %
			</Text>
			<View style={{ flexDirection: 'row' }}>
				<Chip
					compact={true}
					mode='outlined'
					style={{
						fontSize: 15,
						left: 20,
						marginVertical: -15,
						color: '#fff',
						fontWeight: 'bold',
						backgroundColor: '#FFAE8050',
						width: '45%',
						height: 35,
						alignItems: 'center',
					}}
				>
					{selectedProduct?.product_type}
				</Chip>
			</View>
			<Text
				style={{
					fontSize: 17,
					left: 20,
					marginVertical: 60,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				Cantidad disponible:
			</Text>
			<Text
				style={{
					fontSize: 20,
					left: 190,
					marginVertical: -85,
					color: '#fff',
				}}
			>
				{selectedProduct?.amount}
			</Text>
			<Text
				style={{
					fontSize: 17,
					left: 20,
					marginVertical: 100,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				Inicio del descuento:
			</Text>
			<Text
				style={{
					fontSize: 15,
					left: 190,
					marginVertical: -120,
					color: '#fff',
				}}
			>
				{formatDatetime(selectedProduct?.start_time)} hrs
			</Text>
			<Text
				style={{
					fontSize: 17,
					left: 20,
					marginVertical: 140,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				Fin del descuento:
			</Text>
			<Text
				style={{
					fontSize: 15,
					left: 190,
					marginVertical: -160,
					color: '#fff',
				}}
			>
				{formatDatetime(selectedProduct?.final_time)} hrs
			</Text>
			<Text
				style={{
					fontSize: 17,
					left: 20,
					marginVertical: 180,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				Descripción
			</Text>
			<View style={{ flexDirection: 'column' }}>
				<Card>
					<Text
						style={{
							marginBottom: 10,
							marginVertical: -160,
							fontSize: 17,
							left: 20,
							color: '#fff',
							backgroundColor: '#222222',
							width: '90%',
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
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	image: {
		height: 250,
		width: '100%',
		borderRadius: 10,
	},
	title: {
		color: '#fff',
		fontSize: 35,
		marginVertical: -70,
		left: 20,
	},
	subText: {
		color: '#fff',
		fontSize: 17,
	},
});
export default ProductDetail;
