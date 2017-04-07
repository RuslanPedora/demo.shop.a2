import { Component,
         OnInit }      from '@angular/core';
import { Router,
		 Params, 
	     ActivatedRoute } from '@angular/router';
import { Location }       from '@angular/common';

import { Item }           from './item';
import { ItemProperty }   from './item.property';
import { DataService }    from './data.service';
import { CategoryNode }   from './category.node';

@Component({
	moduleId: module.id,
	selector: 'item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
//-----------------------------------------------------------------------------
export class ItemComponent implements OnInit {
	currentItem: Item;
	imagePath: string;
	mainImage: string;
	imageList: string[] = [];	
	propertyList: ItemProperty[] = [];
	//-----------------------------------------------------------------------------
	constructor(  private router: Router,
			      private location: Location,
			      private activatedRoute: ActivatedRoute,
			      private dataService: DataService ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {
		this.imagePath = this.dataService.getImagesPath();
		this.activatedRoute.queryParams.subscribe(
			queryParams => {				
				let itemId = queryParams [ this.dataService.getItemKeyPrefix() +
										   this.dataService.getItemTablePrefix() + 'id' ];
				if( itemId != undefined ) {
					this.getItem( Number.parseInt( itemId ) );
				}
			}
		);		
	}
	//-----------------------------------------------------------------------------
	changeImage( newImage: string ) {
		this.mainImage = newImage;
	}
	//-----------------------------------------------------------------------------
	goBack() {
		this.location.back();
	}
	//-----------------------------------------------------------------------------
	goToItemList() {
		this.dataService.goToItemList();
	}
	//-----------------------------------------------------------------------------
	addItemToShoppingCart(): void {
		this.dataService.addItemToShoppingCart( this.currentItem );
	}
	//-----------------------------------------------------------------------------
	getItem( itemId: number ) {
		this.dataService
        	.getItemList( JSON.stringify( { _ITid: itemId } ) )
        	.then( 
        		itemList => { 
        			if( itemList.length > 0 ) {
        				this.currentItem = itemList[ 0 ];
        				this.mainImage   = this.currentItem.mainImage;
        				this.getImageList();
        				this.getItemPropertyList();
        			}
        		}
        	);

	}
	//-----------------------------------------------------------------------------
	getImageList() {
		this.dataService
        	.getImageList( JSON.stringify( { id: this.currentItem.id } ) )
        	.then( 
        		imageList => this.imageList = imageList.map( element => element [ 'imageSrc' ] )
        	);		
	}
	//-----------------------------------------------------------------------------
	getItemPropertyList() {
		this.dataService
        	.getItemPropertiesList( JSON.stringify( { id: this.currentItem.id } ) )
        	.then( 
        		propertyList => this.propertyList = propertyList.map( 
        			                                   element => 
        			                                   	new ItemProperty( element[ 'propertyId' ], 
        			                                   		              element[ 'propertyName' ], 
        			                                   		              element[ 'propertyValue' ] ) 
        			                                )
        	);		
	}
	//-----------------------------------------------------------------------------
	goToCategory(): void {
		if( this.currentItem.categoryId != undefined )
			this.dataService.emitCategorySelectEvent( new CategoryNode( this.currentItem.categoryId, this.currentItem.category ) );
	}
}