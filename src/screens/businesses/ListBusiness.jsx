import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import Business from './Business';
import HomeHeader from '../../components/common/HomeHeader';
import { businessSelector, getBusinesses, reset } from '../../redux/slices/business';
import { sessionSelector } from '../../redux/slices/session';

const ListBusiness = ({ navigation }) => {
	const [page, setPage] = useState(1);
	const { colors } = useTheme();
	const { loading, businesses, total_pages } = useSelector(businessSelector);
	const { userFavoriteBusiness } = useSelector(sessionSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reset());
	}, []);

	useEffect(() => {
		dispatch(getBusinesses(page));
	}, [page]);

	const onSelectBusiness = (id_business) =>
		navigation.navigate('detailBusiness', { id: id_business });

	return (
		<View style={styles.container}>
			<View style={styles.containerHeader}>
				<HomeHeader onOpenFilter={() => {}} onSearch={() => {}} setValue={() => {}} />
				<Chip
					mode='contained'
					style={{ ...styles.chipSearch, backgroundColor: colors.primary }}
				>
					Todas
				</Chip>
			</View>
			<FlatList
				contentContainerStyle={{ justifyContent: 'center' }}
				data={businesses}
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
				renderItem={({ item }) => (
					<Business
						value={item}
						onSelect={onSelectBusiness}
						isFavorite={userFavoriteBusiness.includes(item?.id_business)}
					/>
				)}
			/>
			{loading === 'pending' && (
				<View style={styles.center}>
					<Text style={styles.text}>Cargando negocios...</Text>
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
		width: 100,
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

export default ListBusiness;
