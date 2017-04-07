import { Component,
         OnInit }      from '@angular/core';
import { Router }      from '@angular/router';

import { Location }    from '@angular/common';

import { Item }        from './item';
import { OrderRow }	   from './order.row';
import { DataService } from './data.service';

@Component({
	moduleId: module.id,
	selector: 'shopping-cart',
	templateUrl: './shopping.cart.component.html',
	styleUrls: [ './shopping.cart.component.css' ]
})
//-----------------------------------------------------------------------------
export class ShoppingCartComponent implements OnInit {
	private orderRows: OrderRow[] = [];
	private total: number;
	private imagePath: string;
	//-----------------------------------------------------------------------------
	constructor( private location: Location,
				 private dataService: DataService,
				 private router: Router ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
		this.imagePath = this.dataService.getImagesPath();
	}
	//-----------------------------------------------------------------------------
	showItemDetail( item: Item ) {
		let paramString: string = ( '{"' + this.dataService.getItemKeyPrefix() +
										   this.dataService.getItemTablePrefix() +
		                                    'id":"' + item.id + '"}' );
		this.router.navigate( [ '/item' ], { queryParams: JSON.parse( paramString ) } );
	}
	//-----------------------------------------------------------------------------
	addItem( item: Item, fixedQuiantity?: number ) {
		if( fixedQuiantity == undefined )
			this.dataService.addItemToShoppingCart( item );
		else	
			this.dataService.addItemToShoppingCart( item, fixedQuiantity );
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
	}
	//-----------------------------------------------------------------------------
	deleteItem( item: Item ) {
		this.dataService.deleteItemToShoppingCart( item );
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
	}
	//-----------------------------------------------------------------------------
	goToItemList() {
		this.dataService.goToItemList();
	}
	//-----------------------------------------------------------------------------
	goBack() {
		this.location.back();
	}
	//-----------------------------------------------------------------------------
	placeOrder() {
		this.router.navigate( [ '/order-form' ] );
	}	
}