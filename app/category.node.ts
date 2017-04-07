export class CategoryNode {
	id: number;
	parentId: number;
	name: string;
	level: number;
	subMenu: boolean;	
	subNodes: CategoryNode[];
	constructor( id: number, name: string ) {
		this.id    = id;
		this.name  = name;
		this.level = -1;
	}
}