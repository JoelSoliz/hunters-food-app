import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

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
				rules={{ required: { message: 'campo requerido', value: true } }}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='email'
							autoCapitalize='none'
							textContentType='emailAddress'
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
						/>
						<HelperText type='error'>{errors.email?.message}</HelperText>
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{ required: { message: 'campo requerido', value: true } }}
				render={({ field: { onBlur, onChange, value } }) => (
					<>
						<TextInput
							mode='outlined'
							label='Password'
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
						/>
						<HelperText type='error'>{errors.password?.message}</HelperText>
					</>
				)}
			/>

			<View>
				<Button mode='contained' onPress={handleSubmit(onSubmit)} disabled={!isValid}>
					Login
				</Button>
			</View>
		</View>
	);
};

export default LoginForm;
