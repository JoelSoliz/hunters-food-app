import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

const RegisterForm = ({ onSubmit }) => {
	const { control, errors, formState, handleSubmit } = useForm({ mode: 'onChange' });

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name='name'
				render={({ field: { onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
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
							mode='outlined'
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
							mode='outlined'
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
							mode='outlined'
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
							mode='outlined'
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
					onPress={handleSubmit(onSubmit)}
					disabled={!formState.isValid}
				>
					Crear cuenta
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 200,
		borderRadius: 45,
	},
	buttonContainer: {
		marginTop: 150,
		display: 'flex',
		alignItems: 'center',
	},
	container: { flex: 1 },
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		backgroundColor: '#52525240',
		color: 'blue',
	},
});

export default RegisterForm;
