import { Item } from 'myapp/item';

export class Point {
	item: Item;
	description: string;
	x: number;
	y: number;
	z: number;
	xView: number;
	yView: number;
	imageWidth: number;
	scale: number;
	constructor( item: Item, 
		         x: number, 
		         y: number, 
		         z:number, 
		         xView: number, 
		         yView: number,
		         imageWidth: number,
		         scale: number ) {
		this.item = item;
		this.description = item.name;
		this.x = x;
		this.y = y;
		this.z = z;
		this.xView = xView;
		this.yView = yView;
		this.imageWidth = imageWidth;		
		this.scale      = scale;
	}
}