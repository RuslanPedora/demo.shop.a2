import { Component, 
		 OnInit,
		 OnDestroy,
	     Output, 
	     EventEmitter } from '@angular/core';
import { Router }       from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { LocalStorageService } from 'angular-2-local-storage';

import { DataService }  from 'services/data.service';
import { CategoryNode } from 'mycore/category.node';
import { ItemProperty } from 'mycore/item.property';
import { ItemPropertyContainer } from 'mycore/item.property.container';

@Component({
	moduleId: module.id,
	selector: 'filter',
	templateUrl: './filter.component.html',
	styleUrls: [ './filter.component.css' ]
})
//-----------------------------------------------------------------------------
export class FilterComponent implements OnInit, OnDestroy {
	private dataServiceListener: Subscription;
	private categoryTree: CategoryNode[] = [];
	private categoryId: number = 0;
	private categoryName: string = '';
	private categorySelectListener: Subscription;
	private showAsCategoryTree: boolean = true;
	private selectedProperties: ItemPropertyContainer[] = [];
	private availableProperties: ItemPropertyContainer[] = [];
	private lowPrice: number;
	private highPrice: number;
	//-----------------------------------------------------------------------------
	constructor( private dataService: DataService,
		         private router: Router,
		         private localStorageService: LocalStorageService ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		let restoredFilterValue: any;

		this.dataServiceListener = this.dataService.itemListEventSource.subscribe(
									message => 
										this.refreshItemList()
			                       );
		this.categorySelectListener = this.dataService.categoryEventSource.subscribe(
									   ( categoryNode: CategoryNode ) =>
										this.processCategorySelect( categoryNode )
								      );
		this.getCategoryHierarchy();
	}
	//-----------------------------------------------------------------------------
	ngOnDestroy() {
		this.dataServiceListener.unsubscribe();
		this.categorySelectListener.unsubscribe();
	}
	//-----------------------------------------------------------------------------
	processCategorySelect( categoryNode: CategoryNode ): void {
		if( this.categoryId != categoryNode.id || categoryNode.level == -1 ) {
			this.categoryId   = categoryNode.id;
			this.categoryName = categoryNode.name;
			this.selectedProperties = [];
			this.refreshItemList();
			this.refreshAvailableProperties();
			this.showAsCategoryTree = false;
		}
	}
	//-----------------------------------------------------------------------------
	getCategoryHierarchy(): void {
		this.dataService
        	.getCategoryHierarchy()
        	.then( 
        	 	( categoryHierarchy: any ) => 
        	 		this.createCategoryTree( this.categoryTree, categoryHierarchy )
        	);
	}	
	//-----------------------------------------------------------------------------
	createCategoryTree( categoryTree: CategoryNode[], categoryList: CategoryNode[], parent?: CategoryNode ): void
		 {
		let currentLeveNodes: CategoryNode[];
		let node: CategoryNode;

		if( parent == undefined )
			currentLeveNodes = categoryList.filter( element => element.parentId == null );
		else
			currentLeveNodes = categoryList.filter( element => element.parentId == parent.id );
		for( let index in currentLeveNodes ) {
			node          = new CategoryNode( currentLeveNodes[ index ].id, currentLeveNodes[ index ].name );
			node.level    = parent == undefined ? 0 : parent.level + 1;
			node.parentId = parent == undefined ? 0 : parent.id;
			node.subNodes = [];
			this.createCategoryTree( node.subNodes, categoryList, node );
			node.subMenu  = node.subNodes.length > 0;
			categoryTree.push( node );
		}
		if( parent == undefined ) {
			node          = new CategoryNode( 0, 'All' );
			node.level    = 0;			
			node.subNodes = [];			
			node.subMenu  = node.subNodes.length > 0;
			categoryTree.push( node );
		}
	}
	//-----------------------------------------------------------------------------
	changeLowPrice( value: number ): void {
		this.lowPrice = value;
		this.refreshAvailableProperties();
		this.refreshItemList();
	}
	//-----------------------------------------------------------------------------
	changeHighPrice( value: number ): void {
		this.highPrice = value;
		this.refreshAvailableProperties();
		this.refreshItemList();
	}
	//-----------------------------------------------------------------------------
	refreshItemList( value?: string ): void {
		let filterObject: any = {};
		let valueArray: string[] = [];
		let some: any;

		for( let i in this.selectedProperties ) {
			filterObject[ this.dataService.getItemListKeyPrefix() + 						  
		                  'propertyId_' + i ] = this.selectedProperties[ i ].itemProperty.id;
			filterObject[ this.dataService.getItemListKeyPrefix() + 						  
		                  'value_' + i ] = this.selectedProperties[ i ].itemPropertyList.map( element => element.value );
		}
		if( this.categoryId != 0 ) 
			filterObject[ this.dataService.getItemListKeyPrefix() + 
						  this.dataService.getItemTablePrefix() + 
		                  'categoryId' ] = this.categoryId;
		if( this.lowPrice != 0 && this.lowPrice != undefined ) 
			filterObject[ this.dataService.getItemListKeyPrefix() + 
						  this.dataService.getItemTablePrefix() + 
		                  'lowPrice' ] = this.lowPrice;
		if( this.highPrice != 0 && this.highPrice != undefined ) 
			filterObject[ this.dataService.getItemListKeyPrefix() + 
						  this.dataService.getItemTablePrefix() + 
		                  'highPrice' ] = this.highPrice;
		this.navigateItemList( filterObject );		
	}
  	//-----------------------------------------------------------------------------
	navigateItemList( filterObject?: any ): void {
		if ( filterObject == undefined || Object.keys( filterObject ).length == 0 )
			this.router.navigate( [ '/item-list' ] );
		else
			this.router.navigate( [ '/item-list' ], { queryParams: filterObject } );
	}
	//-----------------------------------------------------------------------------
	refreshAvailableProperties(): void {
		let filterObject: any = {};
		let valueObject: any = {};
		filterObject[ this.dataService.getItemTablePrefix() +'categoryId' ] = this.categoryId;		
		if( this.lowPrice != 0 && this.lowPrice != undefined )
			filterObject[ this.dataService.getItemTablePrefix() +'lowPrice' ] = this.lowPrice;		
		if( this.highPrice != 0 && this.highPrice != undefined )
			filterObject[ this.dataService.getItemTablePrefix() +'highPrice' ] = this.highPrice;		
		for( let i in this.selectedProperties ) {
			valueObject = {};
			valueObject[ 'propertyId' + this.dataService.getPropertyTablePrefix() ] = 
			           this.selectedProperties[ i ].itemProperty.id
			valueObject[ 'value' + this.dataService.getPropertyTablePrefix() ] =
					   this.selectedProperties[ i ].itemPropertyList.map( element => element.value );
			filterObject[ 'propertyContainer' + i ] = valueObject;
		}

		this.dataService
        	.getAvailableProperties( JSON.stringify( filterObject ) )
        	.then( 
        	 	( availableProperties: any ) => 
        	 		this.createAvailableProperties( availableProperties )
        	);		
	}
	//-----------------------------------------------------------------------------
	createAvailableProperties( availableProperties: any ): void {
		let currentPropertyId: number = 0;
		let currentContainer: ItemPropertyContainer;
		
		this.availableProperties = [];

		for( let i in availableProperties ) {
			if( currentPropertyId != availableProperties[ i ][ 'propertyId' ]) {
				if( currentPropertyId != 0 ) {
					this.availableProperties.push( currentContainer );
				}
				currentPropertyId = availableProperties[ i ][ 'propertyId' ];
				currentContainer = new ItemPropertyContainer( 
					                new ItemProperty( availableProperties[ i ][ 'propertyId' ],
					                                  availableProperties[ i ][ 'propertyName' ], '' )
					               );				
			}
			currentContainer.itemPropertyList.push( new ItemProperty( 
				                                      availableProperties[ i ][ 'propertyId' ],
					                                  availableProperties[ i ][ 'propertyName' ], 
					                                  availableProperties[ i ][ 'value' ]
					                               ));
		}
		if( availableProperties.length > 0 )
			this.availableProperties.push( currentContainer );

	}
	//-----------------------------------------------------------------------------
	addToSelectedProperties( value: ItemProperty ): void {
		let neededContainer: ItemPropertyContainer;
		neededContainer = this.selectedProperties.find( element => element.itemProperty.id == value.id );
		if( neededContainer == undefined ) {
			neededContainer = new ItemPropertyContainer( 
					                new ItemProperty( value[ 'id' ],
					                                  value[ 'name' ], '' )
					               );
			neededContainer.itemPropertyList.push( new ItemProperty( value[ 'id' ],
					                                                 value[ 'name' ], 
					                                                 value[ 'value' ] )
			                                                       );
			this.selectedProperties.push( neededContainer );	
		}	
		else {
			neededContainer.itemPropertyList.push( value );
		}
		this.refreshAvailableProperties();
		this.refreshItemList();
	}
	//-----------------------------------------------------------------------------
	deleteToSelectedProperties( value: ItemProperty ): void {
		let neededContainer: ItemPropertyContainer;
		let neededIndex: number;
		neededContainer = this.selectedProperties.find( element => element.itemProperty.id == value.id );		
		neededIndex = neededContainer.itemPropertyList.findIndex( element => element.value == value.value );
		neededContainer.itemPropertyList.splice( neededIndex, 1 );
		if( neededContainer.itemPropertyList.length == 0 ) {
			neededIndex = this.selectedProperties.findIndex( element => element.itemProperty.id == value.id );		
			this.selectedProperties.splice( neededIndex, 1 );
		}
		this.refreshAvailableProperties();
		this.refreshItemList();
	}
}