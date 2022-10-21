export default function fecha(datos) {
	let fecha1 = new Date(datos.start_time);
	let fecha2 = new Date(datos.final_time);
	let milisegundosDia = 24 * 60 * 60 * 1000;
	let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
	const diasTranscurridos = Math.round((milisegundosTranscurridos / milisegundosDia) * 100) / 100;
	return diasTranscurridos;
}
