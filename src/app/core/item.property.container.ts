import { ItemProperty } from 'mycore/item.property';

export class ItemPropertyContainer {
	itemProperty: ItemProperty;
	itemPropertyList: ItemProperty[];
	constructor ( itemPropertry: ItemProperty ) {
		this.itemProperty     = itemPropertry;
		this.itemPropertyList = [];
	}
}