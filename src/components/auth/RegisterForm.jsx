import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

const ERROR_MESSAGES = {
	email: 'Correo electrónico inválido.',
	maxLength: 'La longitud máxima es',
	minLength: 'La longitud mínima es',
	required: 'Este campo es requerido.',
};

const RegisterForm = ({ loading, onSubmit }) => {
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
		watch,
	} = useForm({ mode: 'onChange' });

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name='name'
				rules={{
					maxLength: { message: `${ERROR_MESSAGES.maxLength} 30.`, value: 30 },
					minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
					required: { message: ERROR_MESSAGES.required, value: true },
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Nombre(s)'
							style={styles.input}
							value={value}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
						/>
						<HelperText type='error'>{errors.name?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='surname'
				rules={{
					maxLength: { message: `${ERROR_MESSAGES.maxLength} 30.`, value: 30 },
					minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
					required: { message: ERROR_MESSAGES.required, value: true },
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Apellido(s)'
							style={styles.input}
							value={value}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
						/>
						<HelperText type='error'>{errors.surname?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='birthday'
				rules={{
					required: { message: ERROR_MESSAGES.required, value: true },
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<DatePickerInput
							mode='outlined'
							inputMode='start'
							locale='es'
							label='Fecha de Nacimiento'
							value={value}
							style={styles.input}
							onBlur={onBlur}
							onChange={(date) => onChange(date)}
						/>
						<HelperText type='error'>{errors.birthday?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='email'
				rules={{
					maxLength: { message: `${ERROR_MESSAGES.maxLength} 30.`, value: 30 },
					minLength: { message: `${ERROR_MESSAGES.minLength} 6.`, value: 6 },
					pattern: {
						message: ERROR_MESSAGES.email,
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
					},
					required: { message: ERROR_MESSAGES.required, value: true },
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							autoCapitalize='none'
							label='Correo electrónico'
							style={styles.input}
							textContentType='emailAddress'
							value={value}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
						/>
						<HelperText type='error'>{errors.email?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{
					maxLength: { message: `${ERROR_MESSAGES.maxLength} 15.`, value: 15 },
					minLength: { message: `${ERROR_MESSAGES.minLength} 6.`, value: 6 },
					required: { message: ERROR_MESSAGES.required, value: true },
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Contraseña'
							secureTextEntry
							style={styles.input}
							textContentType='password'
							value={value}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
						/>
						<HelperText type='error'>{errors.password?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='passwordConfirmation'
				rules={{
					maxLength: { message: `${ERROR_MESSAGES.maxLength} 15.`, value: 15 },
					minLength: { message: `${ERROR_MESSAGES.minLength} 6.`, value: 6 },
					required: { message: ERROR_MESSAGES.required, value: true },
					validate: (value) =>
						value === watch('password') || 'La contraseña no coincide.',
				}}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Confirmar contraseña'
							secureTextEntry
							style={styles.input}
							textContentType='password'
							value={value}
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
						/>
						<HelperText type='error'>{errors.passwordConfirmation?.message}</HelperText>
					</>
				)}
			/>
			<View style={styles.buttonContainer}>
				{loading ? (
					<HelperText type='info'>Loading</HelperText>
				) : (
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(onSubmit)}
						disabled={!isValid}
					>
						Crear cuenta
					</Button>
				)}
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
		marginBottom: 20,
		marginTop: 50,
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
