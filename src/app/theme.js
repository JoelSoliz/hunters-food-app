import { DefaultTheme } from 'react-native-paper';

const theme = {
	...DefaultTheme,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		primary: '#F97316',
		accent: '#169CF9',
		text: '#ffffff',
		placeholder: '#948F8F',
	},
	roundness: 20,
};

export default theme;
