import { Component, 
	     OnInit }         from '@angular/core';
import { Router, 
	     Params, 
	     ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

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
	//-----------------------------------------------------------------------------
	constructor(  private router: Router,
			      private activatedRoute: ActivatedRoute,
			      private dataService: DataService ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.imagePath = this.dataService.getImagesPath();		
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
	sortByNameAsc(): void {
		this.sortedByNameAsc = true;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.name < b.name ? -1 : 1 );
	}
	//-----------------------------------------------------------------------------
	sortByNameDes(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = true;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.name > b.name ? -1 : 1 );
	}
	//-----------------------------------------------------------------------------
	sortByPriceAsc(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = true;
		this.sortedByPriceDes = false;
		this.itemList.sort( ( a, b ) => a.price < b.price ? -1 : 1 );
	}
	//-----------------------------------------------------------------------------
	sortByPriceDes(): void {
		this.sortedByNameAsc = false;
		this.sortedByNameDes = false;
		this.sortedByPriceAsc = false;
		this.sortedByPriceDes = true;
		this.itemList.sort( ( a, b ) => a.price > b.price ? -1 : 1 );
	}
	//-----------------------------------------------------------------------------
	showAsList( value: boolean ): void {
		this.shownAsList = value;
	}
	//-----------------------------------------------------------------------------
	showItemDetail( item: Item ) {
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
		this.currentPage = -1;
		this.initPages();
	}
}