import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/home/Home';
import Business from '../screens/home/HomeBusiness';
import Profile from '../screens/profile/Profile';
import RegisterBusiness from '../screens/registerBusiness/Form';
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
const Busines = () => {
	return (
		<Stack.Navigator
			initialRouteName='home'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='home' component={Business} options={{ title: 'Home' }} />
		</Stack.Navigator>
	);
};

const ProfileRouter = () => {
	const theme = useTheme();
	return (
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
		</Stack.Navigator>
	);
};

const ICONS = {
	negocios: 'shopping-bag',
	Home: 'home',
	Perfil: 'user-alt',
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
				<Tab.Screen name='negocios' component={Busines} />
				<Tab.Screen name='Perfil' component={ProfileRouter} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
