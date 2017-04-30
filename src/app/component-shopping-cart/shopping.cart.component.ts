import { Component,
         OnInit }      from '@angular/core';
import { Router }      from '@angular/router';

import { Location }    from '@angular/common';

import { Item }        from 'mycore/item';
import { OrderRow }	   from 'mycore/order.row';
import { DataService } from 'services/data.service';

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
	//-----------------------------------------------------------------------------
	constructor( private location: Location,
				 private dataService: DataService,
				 private router: Router ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
	}
	//-----------------------------------------------------------------------------
	showItemDetail( item: Item ): void {
		let paramString: string = ( '{"' + this.dataService.getItemKeyPrefix() +
										   this.dataService.getItemTablePrefix() +
		                                    'id":"' + item.id + '"}' );
		this.router.navigate( [ '/item' ], { queryParams: JSON.parse( paramString ) } );
	}
	//-----------------------------------------------------------------------------
	addItem( item: Item, fixedQuiantity?: number ): void {
		if( fixedQuiantity == undefined )
			this.dataService.addItemToShoppingCart( item );
		else	
			this.dataService.addItemToShoppingCart( item, fixedQuiantity );
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
	}
	//-----------------------------------------------------------------------------
	deleteItem( item: Item ): void {
		this.dataService.deleteItemToShoppingCart( item );
		this.orderRows = this.dataService.getShoppingCartRows();
		this.total     = this.dataService.getShoppingCartTotal();
	}
	//-----------------------------------------------------------------------------
	goToItemList(): void {
		this.dataService.goToItemList();
	}
	//-----------------------------------------------------------------------------
	goBack(): void {
		this.location.back();
	}
	//-----------------------------------------------------------------------------
	placeOrder(): void {
		this.router.navigate( [ '/order-form' ] );
	}	
}