function addDays(date, days) {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export default function fecha(datos) {
	let fecha1 = new Date(datos.start_time);
	let fecha2 = new Date(datos.final_time);
	let milisegundosDia = 24 * 60 * 60 * 1000;
	let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
	const diasTranscurridos = Math.round((milisegundosTranscurridos / milisegundosDia) * 100) / 100;
	return diasTranscurridos;
}

export function validateBirthday(dateStr) {
	let date = new Date(dateStr);
	let latestDate = new Date();
	latestDate.setFullYear(latestDate.getFullYear() - 16);
	let oldestDate = new Date();
	oldestDate.setFullYear(latestDate.getFullYear() - 100);

	return date <= latestDate && oldestDate <= date;
}

export function validateGreaterThanToday(dt) {
	let hours = dt?.hours || 0;
	let minutes = dt?.minutes || 0;
	let dateStr = dt?.date.toDateString();
	let date = new Date(dateStr) || new Date();
	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));

	return date >= new Date();
}

export function validateLessThirtyDays(dt) {
	let hours = dt?.hours || 0;
	let minutes = dt?.minutes || 0;
	let dateStr = dt?.date.toDateString();
	let date = new Date(dateStr) || new Date();
	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));

	let future = addDays(new Date(), 30);

	return date <= future;
}

export function validateGreater(dt1, dt2) {
	let hours1 = dt1?.hours || 0;
	let minutes1 = dt1?.minutes || 0;
	let dateStr1 = dt1?.date.toDateString();
	let date1 = new Date(dateStr1) || new Date();
	date1.setHours(parseInt(hours1));
	date1.setMinutes(parseInt(minutes1));

	let hours2 = dt2?.hours || 0;
	let minutes2 = dt2?.minutes || 0;
	let dateStr2 = dt2?.date.toDateString();
	let date2 = new Date(dateStr2) || new Date();
	date2.setHours(parseInt(hours2));
	date2.setMinutes(parseInt(minutes2));

	return date2 > date1;
}
