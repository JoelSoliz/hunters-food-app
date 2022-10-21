import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { getProduct, productsSelector, reset } from '../../redux/slices/product';
import { Chip, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import HomeHeader from './HomeHeader';
import Product from './Product';

const ListProducts = () => {
	const [page, setPage] = useState(1);
	const { colors } = useTheme();
	const { loading, products } = useSelector(productsSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		dispatch(getProduct(page));
	}, [page]);

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
				onEndReached={() => setPage(page + 1)}
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
				renderItem={({ item }) => <Product value={item} />}
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
