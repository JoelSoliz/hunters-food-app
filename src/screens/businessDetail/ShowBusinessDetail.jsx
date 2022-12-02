import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, FlatList } from 'react-native';
import { useTheme, Chip, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AntDesing from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import image from '../../../assets/picture.png';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import BrowserLinking from '../../components/linking/BrowserLinking';
import Product from '../../components/common/Product';
import categories from '../../data/categories.json';
import {
	getBusiness,
	getBusinessProducts,
	businessSelector,
	resetSelectedBusiness,
} from '../../redux/slices/business';
import {
	addFavoriteBusiness,
	removeFavoriteBusiness,
	sessionSelector,
} from '../../redux/slices/session';

const API_HOST = 'https://hunters-food-api-sco3ixymzq-ue.a.run.app';

const ShowBusinessDetail = ({ route, navigation }) => {
	const [imageError, setImageError] = useState(false);
	const [page, setPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const {
		loading,
		selectedBusiness: { business, products, total_pages },
	} = useSelector(businessSelector);
	const { userBusiness, userFavoriteBusiness } = useSelector(sessionSelector);
	const { colors } = useTheme();
	const dispatch = useDispatch();

	const handlerSetFavorite = () => {
		if (userFavoriteBusiness.includes(business.id_business)) {
			setModalOpen(true);
		} else {
			dispatch(addFavoriteBusiness(business.id_business));
		}
	};

	let category = categories.filter((category) => category.value == business?.category);

	useEffect(() => {
		dispatch(resetSelectedBusiness());
		dispatch(getBusiness(route.params.id));
	}, []);

	useEffect(() => {
		if (business && business.id_business === route.params.id) {
			dispatch(getBusinessProducts({ id: route.params.id, page }));
		}
	}, [page, business]);

	const onSelectProduct = (id_product) =>
		navigation.navigate('productDetail', { id: id_product });

	const onEditProduct = (id_product) => navigation.navigate('updateProduct', { id: id_product });

	return (
		<ScrollView nestedScrollEnabled style={styles.container}>
			{loading === 'pending' ? (
				<View style={styles.center}>
					<Text style={styles.text}>Cargando los detalles del negocio...</Text>
				</View>
			) : (
				<>
					<ConfirmationModal
						isOpen={modalOpen}
						message={`¿Quitar de favoritos a ${business?.name}?`}
						onCancel={() => setModalOpen(false)}
						onConfirm={() => {
							dispatch(removeFavoriteBusiness(business.id_business));
							setModalOpen(false);
						}}
						icon={
							<MaterialCommunityIcons
								name='heart-broken'
								style={{ fontSize: 60, color: '#F97316' }}
							/>
						}
					/>
					<View>
						<Image
							onError={() => {
								setImageError(true);
							}}
							source={
								imageError
									? image
									: {
											uri: `${API_HOST}/business/${business?.id_business}/image`,
									  }
							}
							style={styles.image}
						/>
					</View>
					<View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
							}}
						>
							<Text style={styles.title}>{business?.name}</Text>
							<AntDesing
								name='heart'
								style={{
									color: !userFavoriteBusiness.includes(business?.id_business)
										? 'gray'
										: colors.primary,
									fontSize: 25,
									marginTop: 20,
									marginRight: 20,
								}}
								onPress={handlerSetFavorite}
							/>
						</View>
						<View style={{ flexDirection: 'column' }}>
							<Text style={styles.subtitle}>Descripción:</Text>
							<Card>
								<Text style={styles.descrip}>{business?.description}</Text>
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
							<Chip style={styles.categoria}>
								{category.length ? category[0].label : ''}
							</Chip>
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
								<BrowserLinking url={business?.location} />
							</View>
						</View>
					</View>
					<View>
						<FlatList
							nestedScrollEnabled
							contentContainerStyle={{
								justifyContent: 'center',
								paddingTop: 0,
								paddingVertical: 8,
							}}
							data={loading === 'pending' ? [] : products}
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
							renderItem={({ item }) => (
								<Product
									value={item}
									onEdit={onEditProduct}
									onSelect={onSelectProduct}
									isOwner={item.id_business === userBusiness?.id_business}
								/>
							)}
						/>

						{loading === 'pending' && (
							<View style={styles.center}>
								<Text style={styles.text}>Cargando productos...</Text>
							</View>
						)}
					</View>
				</>
			)}
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
		height: 300,
		width: '100%',
		borderRadius: 10,
	},
	title: {
		color: '#fff',
		fontSize: 30,
		marginLeft: 20,
		marginTop: 10,
		fontWeight: 'bold',
		width: '85%',
	},
	subText: {
		color: '#fff',
		fontSize: 17,
	},
	subtitle: {
		fontSize: 17,
		marginLeft: 20,
		marginVertical: 10,
		color: '#fff',
		fontWeight: 'bold',
	},
	descrip: {
		marginBottom: 10,
		marginVertical: 2,
		fontSize: 17,
		marginLeft: 20,
		color: '#fff',
		backgroundColor: '#222222',
		width: '90%',
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
		marginLeft: 30,
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
		marginLeft: 30,
		marginVertical: 7,
		backgroundColor: '#52525240',
		borderRadius: 10,
	},
});
