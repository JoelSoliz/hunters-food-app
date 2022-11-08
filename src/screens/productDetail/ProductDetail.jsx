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
				style={{ fontSize: 60, color: '#F97316', marginVertical: 10, marginLeft: 200 }}
			/>
			<Text style={styles.title}>{selectedProduct?.name}</Text>
			<Text
				style={{
					...styles.subText,
					marginVertical: 100,
					marginLeft: 210,
				}}
			>
				Antes:
			</Text>
			<Text
				style={{
					...styles.subText,
					textDecorationLine: 'line-through',
					marginLeft: 270,
					marginVertical: -120,
				}}
			>
				{selectedProduct?.price} bs
			</Text>
			<Text
				style={{
					...styles.subText,
					marginVertical: 130,
					marginLeft: 210,
				}}
			>
				Ahora:
			</Text>
			<Text
				style={{
					fontSize: 20,
					marginLeft: 270,
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
					marginLeft: 260,
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
						marginLeft: 5,
						marginVertical: -15,
						color: '#fff',
						fontWeight: 'bold',
						width: '45%',
						height: 35,
						alignItems: 'center',
						backgroundColor: '#52525240',
						borderRadius: 10,
					}}
				>
					{selectedProduct?.product_type}
				</Chip>
			</View>
			<Text
				style={{
					fontSize: 17,
					marginLeft: 5,
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
					marginLeft: 170,
					marginVertical: -85,
					color: '#fff',
				}}
			>
				{selectedProduct?.amount}
			</Text>
			<Text
				style={{
					fontSize: 17,
					marginLeft: 5,
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
					marginLeft: 170,
					marginVertical: -120,
					color: '#fff',
				}}
			>
				{formatDatetime(selectedProduct?.start_time)} hrs
			</Text>
			<Text
				style={{
					fontSize: 17,
					marginLeft: 5,
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
					marginLeft: 170,
					marginVertical: -160,
					color: '#fff',
				}}
			>
				{formatDatetime(selectedProduct?.final_time)} hrs
			</Text>
			<Text
				style={{
					fontSize: 17,
					marginLeft: 5,
					marginVertical: 180,
					color: '#fff',
					fontWeight: 'bold',
				}}
			>
				Descripción:
			</Text>
			<View style={{ flexDirection: 'column' }}>
				<Card>
					<Text
						style={{
							marginBottom: 10,
							marginVertical: -160,
							fontSize: 17,
							marginLeft: 5,
							color: '#fff',
							backgroundColor: '#222222',
							width: '97%',
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
	image: {
		height: 250,
		width: '100%',
		borderRadius: 10,
	},
	title: {
		color: '#fff',
		fontSize: 35,
		marginVertical: -70,
		marginLeft: 5,
	},
	subText: {
		color: '#fff',
		fontSize: 17,
	},
});
export default ProductDetail;
