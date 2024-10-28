export interface Client {
	id: string;
	name: string;
	weight: number;
	address: string;
	latitude: number | null;
	longitude: number | null;
}
