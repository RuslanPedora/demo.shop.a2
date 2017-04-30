import { Component,
         OnInit,
         Input }        from '@angular/core';

import { DataService }  from 'services/data.service';
import { CategoryNode } from 'mycore/category.node';

@Component({
	moduleId: module.id,
	selector: 'category-tree',
	templateUrl: './category.tree.component.html',
	styleUrls: [ './category.tree.component.css' ]
})
//-----------------------------------------------------------------------------
export class CategoryTreeComponent {
	@Input()
	categoryList: CategoryNode[] = [];
	//-----------------------------------------------------------------------------
	constructor( private dataService: DataService ) {
	}
	//-----------------------------------------------------------------------------
	chooseCategory( categoryNode: CategoryNode ): void {
		if( !categoryNode.subMenu )
			this.dataService.emitCategorySelectEvent( categoryNode );
	}
	//-----------------------------------------------------------------------------
}         