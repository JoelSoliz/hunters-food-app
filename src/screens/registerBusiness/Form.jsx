import { Controller, useForm } from 'react-hook-form';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import {} from 'react-native-image-picker';

const RegisterForm = () => {
	const { colors } = useTheme();
	const { control, errors, formState, handleSubmit } = useForm({ mode: 'onChange' });

	const submit = (data) => console.log(data);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Negocio</Text>
			<View style={styles.containerForm}>
				<Text>Nombre: </Text>
				<Controller
					control={control}
					name='name'
					render={({ field: { onChange, value } }) => (
						<TextInput
							label='Nombre'
							style={styles.input}
							value={value}
							onChangeText={(value) => onChange(value)}
						/>
					)}
				/>
				<Controller
					control={control}
					name='descripcion'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Descripción'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='ubicacion'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Ubicación'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='categoria'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Categoría'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>

				<View style={styles.buttonContainer}></View>
				<StatusBar style='auto' />
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(submit)}
						disabled={!formState.isValid}
					>
						Registrar
					</Button>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 40,
	},
	container: {
		flex: 1,
		marginHorizontal: 30,
		marginVertical: 80,
	},
	containerForm: {
		flex: 1,
	},
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		//color: '#ffffff',
		backgroundColor: '#52525240',
	},
	button: {
		width: 200,
		borderRadius: 45,
	},
	buttonContainer: {
		marginTop: 150,
		display: 'flex',
		alignItems: 'center',
	},
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 150,
	},
	image: {
		top: '-8%',
		left: '-23%',
		width: 500,
		height: 320,
	},
});

export default RegisterForm;
