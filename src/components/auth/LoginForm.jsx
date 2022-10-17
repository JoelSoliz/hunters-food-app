import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

const ERROR_MESSAGES = {
	email: 'Correo electrónico inválido.',
	required: 'Este campo es requerido.',
};

const LoginForm = ({ onSubmit }) => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	return (
		<View>
			<Controller
				control={control}
				name='email'
				rules={{
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
							label='Correo electrónico'
							autoCapitalize='none'
							textContentType='emailAddress'
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							style={styles.input}
						/>
						<HelperText type='error'>{errors.email?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{ required: { message: ERROR_MESSAGES.required, value: true } }}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Contraseña'
							right={
								showPassword ? (
									<TextInput.Icon
										name={'eye-off'}
										onPress={() => setShowPassword((show) => !show)}
									/>
								) : (
									<TextInput.Icon
										name={'eye'}
										onPress={() => setShowPassword((show) => !show)}
									/>
								)
							}
							secureTextEntry={!showPassword}
							textContentType='password'
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							style={styles.input}
						/>
						<HelperText type='error'>{errors.password?.message}</HelperText>
					</>
				)}
			/>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					onPress={handleSubmit(onSubmit)}
					disabled={!isValid}
					style={styles.button}
				>
					Login
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
		marginBottom: 20,
		marginTop: 50,
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		backgroundColor: '#52525240',
		color: 'blue',
	},
});

export default LoginForm;
