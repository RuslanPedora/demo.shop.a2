import { Item } from './item';

export class OrderRow {
	item: Item;
	currencyId: number;
	currency: string;	
	quantity: number;
	total: number;
	totalview: string;
	constructor( item: Item ) {
		this.item     = item;
		this.quantity = 1;
		this.total    = this.quantity * this.item.discountPrice;
	}
}