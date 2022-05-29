export type ValidationsDocument = {
	isOnlyNumbers: boolean;
	maxLength: number
};

export type Passenger = {
	id?: string;
	names: string;
	lastnames: string;
	nacionality: string;
	documentType: DocumentType;
	documentNumber: number;
}

export type DocumentType = 'dni' | 'ce' | 'pasaporte'