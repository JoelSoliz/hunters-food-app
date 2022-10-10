import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

const RegisterForm = () => {
	const { colors } = useTheme();
	const { control, errors, formState, handleSubmit } = useForm({ mode: 'onChange' });

	const submit = (data) => console.log(data);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Usuario</Text>
			<View style={styles.containerForm}>
				<Controller
					control={control}
					name='name'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Nombre(s)'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='lastname'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Apellido(s)'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='birthday'
					render={({ field: { onChange, value } }) => (
						<>
							<DatePickerInput
								inputMode='start'
								locale='en'
								label='Fecha de Nacimiento'
								value={value}
								style={styles.input}
								onChange={(date) => onChange(date)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='email'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								autoCapitalize='none'
								label='Correo electrónico'
								style={styles.input}
								textContentType='emailAddress'
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='password'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								mode='outlined'
								label='Contraseña'
								secureTextEntry
								style={styles.input}
								textContentType='password'
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='passwordConfirmation'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								mode='flat'
								label='Confirmar contraseña'
								secureTextEntry
								style={styles.input}
								textContentType='password'
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(submit)}
						disabled={!formState.isValid}
					>
						Crear cuenta
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
	container: { flex: 1, marginHorizontal: 30, marginTop: 40 },
	containerForm: { flex: 1 },
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		backgroundColor: '#52525240',
		color: 'blue',
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
});

export default RegisterForm;
