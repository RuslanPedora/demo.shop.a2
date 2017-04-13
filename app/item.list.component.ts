import { Component, 
	     OnInit,
	     NgZone }         from '@angular/core';
import { Router, 
	     Params, 
	     ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

import { LocalStorageService } from 'angular-2-local-storage';

import { Item }           from './item';
import { DataService }    from './data.service';

@Component({
	moduleId: module.id,
	selector: 'item-list',
	templateUrl: './item.list.component.html',
	styleUrls: [ './item.list.component.css' ]
})
//-----------------------------------------------------------------------------
export class ItemListComponent implements OnInit {
	private itemList: Item[] = [];	
	private queryString: string = 'query string';
	private imagePath: string;
	private sortedByNameAsc: boolean = true;
	private sortedByNameDes: boolean = false;
	private sortedByPriceAsc: boolean = false;
	private sortedByPriceDes: boolean = false;
	private shownAsList: boolean = true;
	private pages: number[] = [];
	private itemPerPage: number = 25;
	private currentPage: number = -1;
	private firstElemntInc: number;
	private lastElemntExc: number;
	private showListOption: boolean;
	private hideListOptionWidth: number = 19;
	//-----------------------------------------------------------------------------
	constructor(  private router: Router,
			      private activatedRoute: ActivatedRoute,
			      private dataService: DataService,
			      private localStorageService: LocalStorageService,
			      private ngZone: NgZone ) {

		this.alignListOPtion();

		 window.onresize = ( e ) => ngZone.run ( () => this.alignListOPtion() );
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.imagePath = this.dataService.getImagesPath();		
		this.restoreFromLocalStorage();
		this.activatedRoute.queryParams.subscribe(
			queryParams => {												
				let keyPrefix = this.dataService.getItemListKeyPrefix();
				let propertyWithoutPrefix: string = '';
				let paramValue: string;
				let newFilter: any = {};
				let newQueryString: string = '';

				for( var property in queryParams ) {
					if ( property.indexOf( keyPrefix ) >= 0 ) {
						propertyWithoutPrefix = property.replace( keyPrefix, '' );
						paramValue = queryParams[ property ];
						if ( paramValue.indexOf( ',' ) > 0 )
							newFilter[ propertyWithoutPrefix ] = paramValue.split( ',' );
						else	
							newFilter[ propertyWithoutPrefix ] = paramValue;
					}
				}
				if( Object.keys( newFilter ).length > 0 ) 
					newQueryString = JSON.stringify( newFilter );
				else 	
					newQueryString = '';
				if(  newQueryString != this.queryString ) {
					this.queryString = newQueryString;
					this.getItems( this.queryString );
				}
			}
		);
	}
	//-----------------------------------------------------------------------------
	alignListOPtion(): void {
	 	this.showListOption = ( this.dataService.screenWidthCm( window.innerWidth ) > this.hideListOptionWidth );	 	
	 	if( !this.showListOption ) {	 		
	 		this.showAsList( false );
	 		this.changeItemsPerPage( '25' )
	 	}
	}	
    //----------------------------------------------------------------------------
    restoreFromLocalStorage(): void {
    	let restoredValue: any;
    	restoredValue = this.localStorageService.get( 'demoShopShownAsList' );
    	if( restoredValue != undefined ) 
    		this.shownAsList = restoredValue;
    	restoredValue = this.localStorageService.get( 'demoShopItemPerPage' );
    	if( restoredValue != undefined ) 
    		this.itemPerPage = restoredValue;
    	restoredValue = this.localStorageService.get( 'demoShopSortedByNameAsc' );
    	if( restoredValue != undefined ) { 
    		this.sortedByNameAsc = restoredValue;
    	}	
    	restoredValue = this.localStorageService.get( 'demoShopSortedByNameDes' );
    	if( restoredValue != undefined ) {
    		this.sortedByNameDes = restoredValue;
    	}
    	restoredValue = this.localStorageService.get( 'demoShopSortedByPriceAsc' );
    	if( restoredValue != undefined ) {
    		this.sortedByPriceAsc = restoredValue;
    	}
    	restoredValue = this.localStorageService.get( 'demoShopSortedByPriceDes' );
    	if( restoredValue != undefined ) {
    		this.sortedByPriceDes = restoredValue;
    	}
    }
    //-----------------------------------------------------------------------------
    storeSorting(): void {
    	this.localStorageService.set( 'demoShopSortedByNameAsc', this.sortedByNameAsc );
    	this.localStorageService.set( 'demoShopSortedByNameDes', this.sortedByNameDes );
    	this.localStorageService.set( 'demoShopSortedByPriceAsc', this.sortedByPriceAsc );
    	this.localStorageService.set( 'demoShopSortedByPriceDes', this.sortedByPriceDes );
    }
	//-----------------------------------------------------------------------------
	sortByNameAsc(): void {
		this.sortedByNameAsc = true;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.name < b.name ? -1 : 1 );
		this.storeSorting();
	}
	//-----------------------------------------------------------------------------
	sortByNameDes(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = true;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.name > b.name ? -1 : 1 );
		this.storeSorting();
	}
	//-----------------------------------------------------------------------------
	sortByPriceAsc(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = true;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.price < b.price ? -1 : 1 );
		this.storeSorting();
	}
	//-----------------------------------------------------------------------------
	sortByPriceDes(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = true;
		this.itemList.sort( ( a, b ) => a.price > b.price ? -1 : 1 );
		this.storeSorting();
	}
	//-----------------------------------------------------------------------------
	showAsList( value: boolean ): void {
		this.shownAsList = value;
		this.localStorageService.set( 'demoShopShownAsList', value );
	}
	//-----------------------------------------------------------------------------
	showItemDetail( item: Item ): void {
		let paramString: string = ( '{"' + this.dataService.getItemKeyPrefix() +
			                               this.dataService.getItemTablePrefix() +
		                                   'id":"' + item.id + '"}' );
		this.router.navigate( [ '/item' ], { queryParams: JSON.parse( paramString ) } );
	}
	//-----------------------------------------------------------------------------
	addItemToShoppingCart( item: Item ): void {
		this.dataService.addItemToShoppingCart( item );
	}
	//-----------------------------------------------------------------------------
	deleteItemToShoppingCart( item: Item ): void {
		this.dataService.deleteItemToShoppingCart( item );
	}
	//-----------------------------------------------------------------------------
	getItems( query: string ): void {
		this.dataService
        	.getItemList( query )
        	.then( 
        		itemList => { this.itemList    = itemList;
        					  this.currentPage = -1;
					    	  if( this.sortedByNameAsc )
					    			this.sortByNameAsc();
					    	  if( this.sortedByNameDes )
					    			this.sortByNameDes();
					    	  if( this.sortedByPriceAsc )
					    			this.sortByPriceAsc();
					    	  if( this.sortedByPriceDes )
					    			this.sortByPriceDes();
        					  this.initPages();  
        					}
        	);
	}
	//-----------------------------------------------------------------------------
	initPages(): void {
		let pagesCount: number = 0;

		this.pages = [];
		this.firstElemntInc = 0;
		this.lastElemntExc  = this.itemList.length;
		if( this.itemList.length <= this.itemPerPage || this.itemPerPage == 0 )
			return;
		pagesCount = Math.ceil( this.itemList.length / this.itemPerPage );
		for( let i = 0; i < pagesCount; i++ )
			this.pages.push( i );
		this.setCurrentPage( 0 );
	}
	//-----------------------------------------------------------------------------
	setCurrentPage( value: number ): void {
		if( this.currentPage == value ) {
			return;
		}
		this.currentPage    = value;
		this.firstElemntInc = value * this.itemPerPage;
		this.lastElemntExc  = Math.min( this.firstElemntInc + this.itemPerPage, this.itemList.length );
	}
	//-----------------------------------------------------------------------------
	changeItemsPerPage( value: string ): void {
		this.itemPerPage = Number.parseInt( value );
		this.localStorageService.set( 'demoShopItemPerPage', this.itemPerPage );
		this.currentPage = -1;
		this.initPages();
	}
}