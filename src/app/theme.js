import { DefaultTheme } from 'react-native-paper';

const theme = {
	...DefaultTheme,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		primary: '#F97316',
		accent: '#169CF9',
		error: '#F43939',
		text: '#ffffff',
		placeholder: '#948F8F',
		surface: '#282928',
		card: '#202027',
	},
	roundness: 20,
};

export default theme;
