import { StyleSheet, ScrollView, View, Image, Text, FlatList, RefreshControl } from 'react-native';
import { useTheme, Chip, Card } from 'react-native-paper';
import image from '../../../assets/picture.png';
import BrowserLinking from '../../components/linking/BrowserLinking';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, getBusinessProducts, businessSelector } from '../../redux/slices/business';
import Product from '../../screens/home/Product';

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
const business = {
	name: 'Pollos campeón ',
	category: 'restaurante-familiar',
	location: 'https://maps.app.goo.gl/ssqhPPZfAd9NF5MN6',
	id_business: '0A2K',
	description: 'Pollos esquisitos ',
	//selectedBusiness?
};
const ShowBusinessDetail = ({ route }) => {
	const [imageError, setImageError] = useState(false);
	const [page, setPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const { selectedBusiness, getBusinessProducts } = useSelector(businessSelector);
	const { colors } = useTheme();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		dispatch(getProducts(page));
	}, [page]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setPage(1);
		dispatch(reset());
		dispatch(getProducts(1));
		setRefreshing(false);
	}, [refreshing]);

	return (
		<ScrollView nestedscrollenabled style={styles.container}>
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
				<Text style={styles.title}>{business.name}</Text>

				<View style={{ flexDirection: 'column' }}>
					<Text style={styles.subtitle}>Descripción:</Text>
					<Card>
						<Text style={styles.descrip}>{business.description}</Text>
					</Card>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						textAlignVertical: 'center',
					}}
				>
					<Text style={styles.subtitle}>Categoría:</Text>
					<Chip style={styles.categoria}>{business.category}</Chip>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						textAlignVertical: 'center',
					}}
				>
					<Text style={styles.subtitle}>Ubicación:</Text>
					<View style={styles.ubicacion}>
						<BrowserLinking url={business.location} />
					</View>
				</View>
			</View>
			<View>
				<FlatList
					nestedscrollenabled
					contentContainerStyle={{
						justifyContent: 'center',
						paddingTop: 0,
						paddingVertical: 8,
					}}
					data={products}
					onEndReached={() => {
						if (page + 1 <= total_pages) {
							setPage(page + 1);
						}
					}}
					ItemSeparatorComponent={() => <></>}
					ListHeaderComponent={() => (
						<Text style={styles.title}>Productos ofertados</Text>
					)}
					ListEmptyComponent={() =>
						loading !== 'pending' && (
							<View style={styles.center}>
								<Text style={styles.text}>
									No hay productos disponibles para mostrar.
								</Text>
							</View>
						)
					}
					renderItem={({ item }) => <Product value={item} />}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>

				{loading === 'pending' && (
					<View style={styles.center}>
						<Text style={styles.text}>Loading...</Text>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

export default ShowBusinessDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	image: {
		height: 235,
		width: '100%',
		borderRadius: 10,
	},
	title: {
		color: '#fff',
		fontSize: 30,
		marginVertical: 5,
		left: 20,
		fontWeight: 'bold',
	},
	subText: {
		color: '#fff',
		fontSize: 17,
	},
	subtitle: {
		fontSize: 17,
		left: 20,
		marginVertical: 10,
		color: '#fff',
		fontWeight: 'bold',
	},
	descrip: {
		marginBottom: 10,
		marginVertical: 2,
		fontSize: 17,
		left: 20,
		color: '#fff',
		backgroundColor: '#222222',
		width: '90%',
		height: 100,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 5,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 18,
	},
	center: {
		flex: 1,
		alignItems: 'center',
		alignContent: 'center',
	},
	categoria: {
		fontSize: 17,
		left: 30,
		marginVertical: 7,
		color: '#fff',
		fontWeight: 'bold',
		mode: 'outlined',
		backgroundColor: '#52525240',
		width: '45%',
		height: 35,
		alignItems: 'center',
		compact: true,
		borderRadius: 10,
	},
	ubicacion: {
		fontSize: 17,
		left: 30,
		marginVertical: 7,
		backgroundColor: '#52525240',
		borderRadius: 10,
	},
});
