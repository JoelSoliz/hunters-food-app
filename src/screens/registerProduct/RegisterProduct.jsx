import { StyleSheet, View } from 'react-native';

import ProductForm from '../../components/forms/ProductForm';

const RegisterProductForm = () => {
	const handleSubmit = (data) => console.log(data);
	return (
		<View style={styles.container}>
			<ProductForm onSubmit={handleSubmit} />
		</View>
	);
};
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
});
export default RegisterProductForm;
