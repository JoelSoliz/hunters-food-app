import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import HomeHeader from '../../components/common/HomeHeader';
import Product from '../../components/common/Product';
import productCategories from '../../data/productCategory.json';
import { businessSelector } from '../../redux/slices/business';
import { getProducts, productsSelector, reset } from '../../redux/slices/product';
import ProductCategories from './ProductCategories';

const ListProducts = ({ navigation }) => {
	const [page, setPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filter, setFilter] = useState({ category: '' });
	const { colors } = useTheme();
	const { loading, products, total_pages } = useSelector(productsSelector);
	const { userBusiness } = useSelector(businessSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		dispatch(getProducts({ page, filter }));
	}, [page, filter]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setPage(1);
		dispatch(reset());
		dispatch(getProducts({ page: 1, filter }));
		setRefreshing(false);
	}, [refreshing, filter]);

	const onSelectProduct = (id_product) =>
		navigation.navigate('productDetail', { id: id_product });

	const onEditProduct = (id_product) => navigation.navigate('updateProduct', { id: id_product });

	const onSelectCategory = (productCategory) => {
		dispatch(reset());
		setFilter({ ...filter, category: productCategory });
		setPage(1);
		setIsFilterOpen(false);
	};
	let category = productCategories.filter((category) => category.value == filter.category);

	return (
		<View style={styles.container}>
			<View style={styles.containerHeader}>
				{!isFilterOpen && <HomeHeader onOpenFilter={() => setIsFilterOpen(true)} />}
				<ProductCategories
					isModalOpen={isFilterOpen}
					setIsModalOpen={setIsFilterOpen}
					onSelectCategory={onSelectCategory}
				/>
				<View style={{ alignItems: 'center' }}>
					<Chip
						mode='contained'
						style={{ ...styles.chipSearch, backgroundColor: colors.primary }}
					>
						{category.length ? category[0].label : 'Todas'}
					</Chip>
				</View>
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
						onEdit={onEditProduct}
						onSelect={onSelectProduct}
					/>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
			{loading === 'pending' && (
				<View style={styles.center}>
					<Text style={styles.text}>Cargando productos...</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		alignContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	chipSearch: {
		alignItems: 'center',
		height: 30,
		justifyContent: 'center',
		marginVertical: 5,
	},
	container: {
		backgroundColor: '#282928',
		flex: 1,
	},
	containerHeader: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 18,
	},
});

export default ListProducts;
