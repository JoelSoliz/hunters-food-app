import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import RegisterBusiness from '../screens/registerBusiness/Form';
import RegisterProduct from '../screens/registerProduct/RegisterProduct';
import SignIn from '../screens/login/Login';
import SignUp from '../screens/registerUser/RegisterUser';

const Stack = createNativeStackNavigator();

const HomeRouter = () => {
	return (
		<Stack.Navigator
			initialRouteName='home'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='home' component={Home} options={{ title: 'Home' }} />
		</Stack.Navigator>
	);
};

const ProfileRouter = () => {
	const theme = useTheme();
	return (
		<Stack.Navigator
			initialRouteName='profile'
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
			<Stack.Screen name='profile' component={Profile} options={{ title: 'Perfil' }} />
			<Stack.Screen name='login' component={SignIn} options={{ title: 'Iniciar Sesión' }} />
			<Stack.Screen
				name='signUp'
				component={SignUp}
				options={{ title: 'Registrar Usuario' }}
			/>
			<Stack.Screen
				name='registerBusiness'
				component={RegisterBusiness}
				options={{ title: 'Registrar Negocio' }}
			/>
			<Stack.Screen
				name='registerProduct'
				component={RegisterProduct}
				options={{ title: 'Registrar Producto' }}
			/>
		</Stack.Navigator>
	);
};

const ICONS = {
	Home: 'home-sharp',
	Perfil: 'person',
};

const Tab = createBottomTabNavigator();

const Navigator = () => {
	const theme = useTheme();

	return (
		<NavigationContainer theme={theme}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					activeTintColor: theme.colors.primary,
					inactiveTintColor: '#FFB27D',
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name={ICONS[route.name]} size={size} color={color} />
					),
					tabBarStyle: {
						height: 60,
					},
				})}
			>
				<Tab.Screen name='Home' component={HomeRouter} />
				<Tab.Screen name='Perfil' component={ProfileRouter} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
