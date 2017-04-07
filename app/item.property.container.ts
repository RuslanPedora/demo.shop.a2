import { ItemProperty } from './item.property';

export class ItemPropertyContainer {
	itemProperty: ItemProperty;
	itemPropertyList: ItemProperty[];
	constructor ( itemPropertry: ItemProperty ) {
		this.itemProperty     = itemPropertry;
		this.itemPropertyList = [];
	}
}