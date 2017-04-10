import { Component, 
	     OnInit,
         OnDestroy }    from '@angular/core';
import { Router }       from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DataService }  from './data.service';

@Component({
	moduleId: module.id,
	selector: 'demo-shop',
	templateUrl: './demo.shop.component.html',
	styleUrls: [ './demo.shop.component.css' ]
})
//-----------------------------------------------------------------------------
export class DemoShop implements OnInit, OnDestroy {
	private filterValue: string;
	private eventValue: number = 0;
	private shoppingCartListener: Subscription;
	private nameMask: string = '';	
	private showFilter: boolean = true;
	//-----------------------------------------------------------------------------
	constructor( private dataService: DataService,
	             private router: Router ) {
	}
	//-----------------------------------------------------------------------------
	toggelFilter(): void {
		this.showFilter = !this.showFilter;
	}
	//-----------------------------------------------------------------------------
	searchByName(): void {
		let filterObject = {};
		if( this.nameMask == '' )
			this.routeItemList();
		else {			
			filterObject[ this.dataService.getItemListKeyPrefix() + this.dataService.getItemTablePrefix() + 'name' ] = this.nameMask;
			this.routeItemList( JSON.stringify( filterObject) );
		}	
	}
  	//-----------------------------------------------------------------------------
	routeItemList( query?: string ):void {
		if ( query == undefined )
			this.dataService.goToItemList();
		else
			this.router.navigate( [ '/item-list' ], { queryParams: JSON.parse( query ) } );
	}	
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.shoppingCartListener = this.dataService.shoppingCartEventSource.subscribe(
			                        	  eventValue => 
			                               this.eventValue = this.dataService.getShoppingCartTotal()
			                             );
		this.dataService.restoreFromLocalStorage();
	}
	//-----------------------------------------------------------------------------
	ngOnDestroy() {
		this.shoppingCartListener.unsubscribe();
	}
}