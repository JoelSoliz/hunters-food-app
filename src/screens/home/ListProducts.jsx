import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, FlatList, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, productsSelector, reset } from '../../redux/slices/product';
import { Chip, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import HomeHeader from './HomeHeader';
import Product from './Product';
import { businessSelector } from '../../redux/slices/business';

const ListProducts = ({ navigation }) => {
	const [page, setPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const { colors } = useTheme();
	const { loading, products, total_pages } = useSelector(productsSelector);
	const { userBusiness } = useSelector(businessSelector);
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

	const onSelectProduct = (id_product) =>
		navigation.navigate('updateProduct', { id: id_product });

	const onSelectProductDetail = (id_product) =>
		navigation.navigate('productDetail', { id: id_product });
	return (
		<View style={styles.container}>
			<View style={styles.containerHeader}>
				<HomeHeader />
				<Chip
					mode='contained'
					style={{ ...styles.chipSearch, backgroundColor: colors.primary }}
				>
					Todas
				</Chip>
			</View>
			<FlatList
				contentContainerStyle={{ justifyContent: 'center' }}
				data={products}
				onEndReached={() => {
					if (page + 1 <= total_pages) {
						setPage(page + 1);
					}
				}}
				ItemSeparatorComponent={() => <></>}
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
						isOwner={item.id_business === userBusiness?.id_business}
						onSelect={onSelectProduct}
						onSelectDetail={onSelectProductDetail}
					/>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
			{loading === 'pending' && (
				<View style={styles.center}>
					<Text style={styles.text}>Loading...</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
	},
	containerHeader: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	chipSearch: {
		alignItems: 'center',
		height: 30,
		justifyContent: 'center',
		marginVertical: 5,
		width: 100,
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
});

export default ListProducts;
