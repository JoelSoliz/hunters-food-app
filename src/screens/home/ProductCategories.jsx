import { Text, Modal, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, Chip } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import productCategories from '../../data/productCategory.json';

const ProductCategories = ({ isModalOpen, setIsModalOpen, onSelectCategory }) => {
	const { colors } = useTheme();

	return (
		<Modal animationType='fade' style={{ top: -10 }} transparent={true} visible={isModalOpen}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={{ flexDirection: 'row' }}>
						<AntDesign
							name='menu-fold'
							style={{
								fontSize: 35,
								color: colors.primary,
							}}
							onPress={() => setIsModalOpen(false)}
						/>
					</View>
					<View style={styles.titleContainer}>
						<Text
							style={{
								...styles.title,
								color: colors.primary,
							}}
						>
							Categorías
						</Text>
					</View>
				</View>
				<ScrollView>
					<View style={{ ...styles.centeredContent }}>
						{[...productCategories, { value: '', label: 'Todas' }].map(
							(category, index) => (
								<View style={{ width: '100%' }} key={index}>
									<TouchableOpacity
										style={styles.centeredContent}
										onPress={() => onSelectCategory(category.value)}
									>
										<Chip
											compact={true}
											mode='outlined'
											style={styles.chipStyle}
										>
											{category.label}
										</Chip>
									</TouchableOpacity>
								</View>
							)
						)}
					</View>
				</ScrollView>
				<View style={styles.centeredContent}>
					<AntDesign
						name='minus'
						style={{
							fontSize: 45,
							color: colors.primary,
						}}
						animationType={'slide'}
						onPress={() => setIsModalOpen(false)}
					/>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#282928',
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		borderColor: '#1d1e1d',
		borderBottomWidth: 3,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		maxHeight: 450,
		paddingTop: 2,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 10,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
	},
	titleContainer: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginLeft: -30,
	},
	centeredContent: {
		alignItems: 'center',
		alignContent: 'center',
	},
	chipStyle: {
		alignItems: 'center',
		backgroundColor: '#52525240',
		borderRadius: 10,
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
		height: 35,
		width: '60%',
		marginVertical: 7,
	},
});

export default ProductCategories;
