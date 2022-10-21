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

export function validateGreaterThanToday(dateStr, timeStr) {
	let date = new Date(dateStr);
	let [hours, minutes] = timeStr ? [timeStr['hours'], timeStr['minutes']] : [0, 0];
	date.setHours(parseInt(hours));
	date.setMinutes(parseInt(minutes));

	return date >= new Date();
}

export function validateGreater(dateStr1, timeStr1, dateStr2, timeStr2) {
	let date1 = new Date(dateStr1);
	let [hours1, minutes1] = timeStr1 ? [timeStr1['hours'], timeStr1['minutes']] : [0, 0];
	date1.setHours(hours1);
	date1.setMinutes(minutes1);

	let date2 = new Date(dateStr2);
	let [hours2, minutes2] = timeStr2 ? [timeStr2['hours'], timeStr2['minutes']] : [0, 0];
	date2.setHours(hours2);
	date2.setMinutes(minutes2);

	return date2 > date1;
}
