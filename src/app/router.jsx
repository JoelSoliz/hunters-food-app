import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import SignIn from '../screens/login/Login';
import SignUp from '../screens/registerUser/RegisterUser';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

const Router = () => {
	const theme = useTheme();

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator
				initialRouteName='home'
				screenOptions={{
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerTintColor: 'black',
					headerTitleStyle: {
						textAlign: 'center',
						fontWeight: '#F97316',
					},
				}}
			>
				<Stack.Screen
					name='login'
					component={SignIn}
					options={{ title: 'Iniciar Sesion' }}
				/>
				<Stack.Screen
					name='signUp'
					component={SignUp}
					options={{ title: 'Registrar Usuario' }}
				/>
				<Stack.Screen name='home' component={Home} options={{ title: 'Home' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
