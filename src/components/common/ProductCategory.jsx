import React, { useCallback, useEffect, useState } from 'react';
import { Text, Modal, View, StyleSheet, FlatList } from 'react-native';
import { useTheme, Button, Chip } from 'react-native-paper';
import AntDesing from 'react-native-vector-icons/AntDesign';
import { productsSelector } from '../../redux/slices/product';
import { useSelector } from 'react-redux';
export default function ProductCategory({ isModalOpen, setIsModalOpen }) {
	const { colors } = useTheme();
	const { products } = useSelector(productsSelector);

	return (
		<>
			<Modal
				visible={isModalOpen}
				transparent={true}
				animationType={'fade'}
				style={colors.primary}
				mode='outlined'
			>
				<View style={styles.modalContainerStyle}>
					<View style={styles.modalStyle}>
						<View style={styles.header}>
							<AntDesing
								name='menu-fold'
								style={{
									fontSize: 35,
									color: colors.primary,
								}}
								onPress={() => setIsModalOpen(!isModalOpen)}
							/>
							<Text
								style={{
									...styles.title,
									color: colors.primary,
								}}
							>
								Categorías
							</Text>
						</View>
						<View style={styles.categorias}>
							<FlatList
								nestedscrollenabled
								contentContainerStyle={{ justifyContent: 'center' }}
								data={products}
								renderItem={({ item }) => (
									<Chip
										value={item}
										compact={true}
										mode='outlined'
										style={{
											fontSize: 15,
											color: '#fff',
											fontWeight: 'bold',
											width: '45%',
											height: 35,
											alignItems: 'center',
											backgroundColor: '#52525240',
											borderRadius: 10,
											top: 10,
										}}
									>
										{item?.product_type}
									</Chip>
								)}
								ItemSeparatorComponent={() => <></>}
							/>

							<AntDesing
								name='minus'
								style={{
									fontSize: 45,
									color: colors.primary,
								}}
								animationType={'slide'}
								onPress={() => setIsModalOpen(!isModalOpen)}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}
const styles = StyleSheet.create({
	modalContainerStyle: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	modalStyle: {
		color: '#fff',
		backgroundColor: '#282928',
		borderRadius: 16,
		paddingTop: 7.5,
		shadowColor: '#000',
		shadowOffset: { with: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	title: {
		color: '#000',
		fontSize: 22,
		forntWeight: 'bold',
		marginLeft: 70,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		marginLeft: 20,
	},
	categorias: {
		alignItems: 'center',
		alignContent: 'center',
	},
});
