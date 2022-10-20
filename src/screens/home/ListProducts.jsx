import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';

import AntDesing from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, productsSelector, reset } from '../../redux/slices/product';
import fecha from '../../components/operaciones/fecha.js';
import { Chip } from 'react-native-paper';

const ListProducts = () => {
	const [page, setPage] = useState(1);
	const { loading, products } = useSelector(productsSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reset());
	}, []);
	useEffect(() => {
		dispatch(getProduct(page));
		console.log(page);
	}, [page]);
	return (
		<View style={styles.container}>
			<AntDesing name='menuunfold' style={styles.menu} />
			<Image source={require('../../../assets/logo.png')} style={styles.image} />
			<Text style={styles.titulo}>Hunters Food</Text>
			<TextInput
				placeholder='Buscar...'
				placeholderTextColor='#948F8F'
				style={styles.textImput}
			/>
			<TouchableOpacity
				style={{
					...styles.button,
					backgroundColor: '#F97316',
				}}
			>
				<Text style={{ ...styles.buttonText, color: '#F1F1F1' }}>Todas</Text>
			</TouchableOpacity>

			<FlatList
				contentContainerStyle={{ justifyContent: 'center' }}
				// style={{ flex: 1 }}
				data={products}
				onEndReached={() => setPage(page + 1)}
				ItemSeparatorComponent={() => <Text> </Text>}
				renderItem={({ item: datos }) => (
					<View style={styles.box}>
						<AntDesing
							name='shoppingcart'
							style={{ fontSize: 25, color: '#F97316', top: '10%', left: '85%' }}
						/>
						<Image
							source={require('../../../assets/comida.png')}
							style={styles.imageFood}
						/>
						<Text
							style={{
								color: '#FFFFFF',
								fontSize: 18,
								paddingTop: 10,
								margin: 10,
								paddingBottom: 5,
								top: -90,
								left: 100,
							}}
						>
							{datos.name}
						</Text>

						<Text
							style={{
								color: '#FFFFFF',
								fontSize: 15,
								padding: 10,
								paddingBottom: 5,
								top: '-78%',
								left: '80%',
							}}
						>
							Bs. {datos.price}
						</Text>
						<View>
							<Text
								style={{
									color: '#FFFFFF',
									fontSize: 15,
									padding: 10,
									paddingBottom: 5,
									left: 10,
									top: -88,
								}}
							>
								Expira en: {fecha(datos)}
							</Text>
						</View>

						<View>
							<Chip
								mode='outlined'
								textStyle={{ color: '#FFFFFF' }}
								style={{
									width: '50%',
									height: '30%',
									color: '#FFFFFF',
									fontSize: 15,
									padding: -5,
									paddingBottom: 5,
									top: -170,
									left: '30%',
								}}
							>
								{datos.product_type}
							</Chip>
							<Text
								style={{
									color: '#FFFFFF',
									fontSize: 15,
									padding: 10,
									paddingBottom: 5,
									top: -180,
									left: '35%',
								}}
							>
								Cantidad: {datos.amount}
								{'\n'}
								Descuento: {datos.discount} %
							</Text>
						</View>
					</View>
				)}
			/>
			{loading === 'pending' && <Text>Loading...</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		//alignItems: 'center',
		//justifyContent: 'center',
		top: 40,
	},
	image: {
		width: 50,
		height: 50,
		top: '-3%',
		left: '15%',
	},
	titulo: {
		fontSize: 30,
		color: '#ffff',
		fontWeight: 'bold',
		top: '-11%',
		left: '35%',
	},
	subTitle: {
		fontSize: 15,
		color: 'brown',
	},
	textImput: {
		//borderWidth: 1,
		//borderColor: 'black',
		width: '80%',
		height: 30,
		padding: 5,
		paddingStart: 150,
		marginTop: 20,
		borderRadius: 15,
		backgroundColor: '#212121',
		top: -45,
		left: 30,
	},
	button: {
		alignSelf: 'center',
		borderRadius: 15,
		paddingVertical: 10,
		width: '20%',
		top: -15,
		left: -150,
	},
	buttonText: {
		textAlign: 'center',
	},
	menu: {
		fontSize: 35,
		color: '#F97316',
		top: 25,
		left: 20,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 15,
		paddingTop: 10,
		padding: 10,
		paddingBottom: 5,
	},
	box: {
		width: '90%',
		height: 150,
		top: 10,
		left: 20,
		backgroundColor: '#474747',
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#F97316',
	},
	imageFood: {
		width: 80,
		height: 80,
		left: 10,
	},
});

export default ListProducts;
