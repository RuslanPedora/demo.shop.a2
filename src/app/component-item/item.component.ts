import { Component,
         OnInit }      from '@angular/core';
import { Router,
		 Params, 
	     ActivatedRoute } from '@angular/router';
import { Location }       from '@angular/common';

import { Item }           from 'mycore/item';
import { ItemProperty }   from 'mycore/item.property';
import { DataService }    from 'services/data.service';
import { CategoryNode }   from 'mycore/category.node';

@Component({
	moduleId: module.id,
	selector: 'item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
//-----------------------------------------------------------------------------
export class ItemComponent implements OnInit {
	currentItem: Item;
	mainImage: string = '';
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
	changeImage( newImage: string ): void {
		let imageElelemt: any;
		let dataObject: any;

		if( this.mainImage == newImage )
			return;

		imageElelemt = document.getElementById( 'mainImage' );
		imageElelemt.style.opacity = 0;
		dataObject = this;

		setTimeout( function() { dataObject.mainImage = newImage;
								 imageElelemt.style.opacity = 1;
							   }, 
			        1000
			      );
	}
	//-----------------------------------------------------------------------------
	goBack(): void {
		this.location.back();
	}
	//-----------------------------------------------------------------------------
	goToItemList(): void {
		this.dataService.goToItemList();
	}
	//-----------------------------------------------------------------------------
	addItemToShoppingCart(): void {
		this.dataService.addItemToShoppingCart( this.currentItem );
	}
	//-----------------------------------------------------------------------------
	getItem( itemId: number ): void {
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
	getImageList(): void {
		this.dataService
        	.getImageList( JSON.stringify( { id: this.currentItem.id } ) )
        	.then( 
        		imageList => this.imageList = imageList.map( element => element [ 'imageSrc' ] )
        	);		
	}
	//-----------------------------------------------------------------------------
	getItemPropertyList(): void {
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