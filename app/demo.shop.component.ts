import { Component, 
	     OnInit,
         OnDestroy,
         NgZone }    from '@angular/core';
import { Router }       from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DataService }  from './data.service';

@Component({
	moduleId: module.id,
	selector: 'demo-shop',
	templateUrl: './demo.shop.component.html',
	styleUrls: [ './demo.shop.component.css' ],
	host: {
	    '(window:resize)': 'onResize($event)'
  	}	
})
//-----------------------------------------------------------------------------
export class DemoShop implements OnInit, OnDestroy {
	private filterValue: string;
	private eventValue: number = 0;
	private shoppingCartListener: Subscription;
	private nameMask: string = '';	
	private showFilter: boolean;
	private hideFilterWidth = 17;
	//-----------------------------------------------------------------------------
	constructor( private dataService: DataService,
	             private router: Router,
	             private ngZone: NgZone ) {

	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.shoppingCartListener = this.dataService.shoppingCartEventSource.subscribe(
			                        	  eventValue => 
			                               this.eventValue = this.dataService.getShoppingCartTotal()
			                             );
		this.dataService.restoreFromLocalStorage();
	 	this.alignFilterVisivility();
	}
	//-----------------------------------------------------------------------------
	onResize( event: any ){
    	this.alignFilterVisivility(); 
   	}
	//-----------------------------------------------------------------------------
	alignFilterVisivility(): void {
		this.showFilter = ( this.dataService.screenWidthCm( window.innerWidth ) > this.hideFilterWidth );
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
	ngOnDestroy() {
		this.shoppingCartListener.unsubscribe();
	}
}