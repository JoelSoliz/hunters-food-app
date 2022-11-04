import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { businessSelector, reset, getBusiness } from '../../redux/slices/business';
import { Chip, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import HomeHeader from './HomeHeader';
import Business from './Business';

const Listbusiness = () => {
	const [page, setPage] = useState(1);
	const { colors } = useTheme();
	const { loading, business, total_pages } = useSelector(businessSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		dispatch(getBusiness(page));
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
				data={business}
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
								No hay negocios disponibles para mostrar.
							</Text>
						</View>
					)
				}
				renderItem={({ item }) => <Business value={item} />}
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

export default Listbusiness;
