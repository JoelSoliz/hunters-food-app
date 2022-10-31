import Intl from 'intl';
import 'intl/locale-data/jsonp/es';
import 'intl/locale-data/jsonp/en';
import { registerTranslation } from 'react-native-paper-dates';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

import store, { persistor } from './src/redux/store';
import App from './src/app/App';

registerTranslation('es', {
	save: 'Guardar',
	selectSingle: 'Seleccionar fecha',
	selectMultiple: 'Seleccionar fechas',
	selectRange: 'Seleccionar períodos',
	notAccordingToDateFormat: (inputFormat) => `El formato de la fecha debe ser ${inputFormat}`,
	mustBeHigherThan: (date) => `Debe ser después de ${date}`,
	mustBeLowerThan: (date) => `Debe ser antes de ${date}`,
	mustBeBetween: (startDate, endDate) => `Debe estar entre ${startDate} - ${endDate}`,
	dateIsDisabled: 'Día no esta permitido',
	previous: 'Anterior',
	next: 'Siguiente',
	typeInDate: 'Escriba la fecha',
	pickDateFromCalendar: 'Escoge fecha del calendario',
	close: 'Cerrar',
});

const isAndroid = require('react-native').Platform.OS === 'android';
if (isAndroid) {
	require('@formatjs/intl-getcanonicallocales/polyfill');
	require('@formatjs/intl-locale/polyfill');

	require('@formatjs/intl-pluralrules/polyfill');
	require('@formatjs/intl-pluralrules/locale-data/es.js');

	require('@formatjs/intl-displaynames/polyfill');
	require('@formatjs/intl-displaynames/locale-data/es.js');

	require('@formatjs/intl-listformat/polyfill');
	require('@formatjs/intl-listformat/locale-data/es.js');

	require('@formatjs/intl-numberformat/polyfill');
	require('@formatjs/intl-numberformat/locale-data/es.js');

	require('@formatjs/intl-relativetimeformat/polyfill');
	require('@formatjs/intl-relativetimeformat/locale-data/es.js');

	require('@formatjs/intl-datetimeformat/polyfill');
	require('@formatjs/intl-datetimeformat/locale-data/es.js');

	require('@formatjs/intl-datetimeformat/add-golden-tz.js');

	if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
		Intl.DateTimeFormat.__setDefaultTimeZone(require('expo-localization').timezone);
	}
}

const Root = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={<Text>Loading ...</Text>} persistor={persistor}>
				<App />
			</PersistGate>
		</ReduxProvider>
	);
};

export default Root;
