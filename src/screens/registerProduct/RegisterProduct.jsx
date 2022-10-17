import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import ProductForm from '../../components/forms/ProductForm';

const RegisterProductForm = () => {
	const { colors } = useTheme();
	const handleSubmit = (data) => console.log(data);
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Producto</Text>
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
		marginHorizontal: 30,
		marginVertical: 70,
	},
});
export default RegisterProductForm;
