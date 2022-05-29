export type ValidacionesDocumento = {
	isOnlyNumbers: boolean;
	maxLength: number
};

export type Passenger = {
	nombres: string;
	apellidos: string;
	nacionalidad: string;
	tipoDocumento: string;
	numeroDocumento: number;
}