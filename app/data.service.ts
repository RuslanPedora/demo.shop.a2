import { Injectable }     from '@angular/core';
import { Http,
         Headers, 
         RequestOptions } from '@angular/http';
import { Subject }        from 'rxjs/Subject';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from 'angular-2-local-storage';

import { Item }         from './item';
import { OrderRow }     from './order.row';
import { CategoryNode } from './category.node';
import { ItemProperty}  from './item.property';
import { Carrier }      from './carrier';

@Injectable()
//-----------------------------------------------------------------------------
export class DataService {
	private itemKeyPrefix: string     = '_I';
	private itemListKeyPrefix: string = '_IL';
	private propertyTablePrefix: string = '_PT';
	private itemTablePrefix: string = '_IT';
	private hostUrl: string = 'http://localhost:8081';
	private itemsUrl: string               = this.hostUrl + '/items';
	private orderUrl: string               = this.hostUrl + '/order';
	private discountItemsUrl: string       = this.hostUrl + '/discount_items';
	private itemImagesUrl: string          = this.hostUrl + '/item_images';
	private categoryHierarchyUrl: string   = this.hostUrl + '/category_tree';
	private itemPropertiesUrl: string      = this.hostUrl + '/item_properties';
	private availablePropertiesUrl: string = this.hostUrl + '/available_properties';
	private carriersUrl: string            = this.hostUrl + '/carriers';
	private imagePath: string              = this.hostUrl + '/app/images/';
	//-----------------------------------------------------------------------------
	private shoppingCartEventEmitter = new Subject<string>(); 
	shoppingCartEventSource: Observable<string>;
	private itemListEventEmitter = new Subject<string>(); 		
	itemListEventSource: Observable<string>;
	private categoryEventEmitter = new Subject<CategoryNode>();
	categoryEventSource: Observable<CategoryNode>;
	//-----------------------------------------------------------------------------
	private tempItemList: Item[] = [];	
	private orderRows: OrderRow[] = [];	
	//-----------------------------------------------------------------------------
	constructor( private http: Http,
				 private localStorageService: LocalStorageService ) {
		this.shoppingCartEventSource   = this.shoppingCartEventEmitter.asObservable();
		this.itemListEventSource       = this.itemListEventEmitter.asObservable();
		this.categoryEventSource       = this.categoryEventEmitter.asObservable();
    }
    //----------------------------------------------------------------------------
    restoreFromLocalStorage(): void {
    	let restoredValue: any;
    	restoredValue = this.localStorageService.get( 'demoShopShoppingCart' );
    	try {
    		this.orderRows = JSON.parse( restoredValue );
    	}
    	catch( error ) {    		
    	}    	
    	this.emitShoppingCartEvent( '' );
    }
    //----------------------------------------------------------------------------
    getImagesPath(): string {
    	return this.imagePath;
    }
    //----------------------------------------------------------------------------
    goToItemList(): void {
    	this.itemListEventEmitter.next( '' );
    }
    //-----------------------------------------------------------------------------
    getShoppingCartTotal(): number {
    	let result: number = 0;
    	if( this.orderRows.length > 0 )
    		result = this.orderRows.map( element => element.total ).reduce( ( total, sum ) => total + sum );
    	return result;
    }
    //-----------------------------------------------------------------------------
    getShoppingCartRows(): OrderRow[] {
    	return this.orderRows;
    }
    //-----------------------------------------------------------------------------
    addItemToShoppingCart( item: Item, fixedQuiantity?: number ): void {		
    	let neededRow: number;
    	
    	neededRow = this.orderRows.findIndex( element => element.item.id == item.id );
    	if( neededRow < 0 )
			this.orderRows.push( new OrderRow( item ) );
		else {
			if( fixedQuiantity == undefined )
				this.orderRows[ neededRow ].quantity++;
			else	
				this.orderRows[ neededRow ].quantity = fixedQuiantity;
			if( this.orderRows[ neededRow ].quantity <= 0 ) {
				this.deleteItemToShoppingCart( item );
				return;
			}
			this.orderRows[ neededRow ].total = this.orderRows[ neededRow ].quantity * 
			                                    this.orderRows[ neededRow ].item.discountPrice;
		}
		this.shoppingCartEventEmitter.next( '' );
		this.saveShoppingCart();
    }    
    //-----------------------------------------------------------------------------
    saveShoppingCart(): void {
    	this.localStorageService.set( 'demoShopShoppingCart', JSON.stringify( this.orderRows ) );
    }
    //-----------------------------------------------------------------------------
    deleteItemToShoppingCart( item: Item ): void {
    	let neededRow: number;
    	let discount: number;

    	neededRow = this.orderRows.findIndex( element => element.item.id == item.id );
    	if( neededRow >= 0 ) {
    		this.orderRows[ neededRow ].quantity--;
    		if( this.orderRows[ neededRow ].quantity <= 0 ) 
    			this.orderRows.splice( neededRow, 1 );
    		else {	
    			this.orderRows[ neededRow ].total = this.orderRows[ neededRow ].quantity * 
    		                                        this.orderRows[ neededRow ].item.discountPrice;
 			}   		                                        
    		this.shoppingCartEventEmitter.next( '' );
    		this.saveShoppingCart();
    	}    	
    }
	//-----------------------------------------------------------------------------
	getItemKeyPrefix(): string {
		return this.itemKeyPrefix;
	}
	//-----------------------------------------------------------------------------
	getItemListKeyPrefix(): string {
		return this.itemListKeyPrefix;
	}
    //-----------------------------------------------------------------------------
    getPropertyTablePrefix(): string {
    	return this.propertyTablePrefix;
    }
    //-----------------------------------------------------------------------------
    getItemTablePrefix(): string {
    	return this.itemTablePrefix;
    }
    //-----------------------------------------------------------------------------
    emitCategorySelectEvent( categoryNode: CategoryNode): void {
    	this.categoryEventEmitter.next( categoryNode );
    }
    //-----------------------------------------------------------------------------
    emitShoppingCartEvent( eventName: string ): void {
    	this.shoppingCartEventEmitter.next( eventName );
    }
    //-----------------------------------------------------------------------------
	getItemList( queryString: string ): Promise<Item[]> {
		if ( queryString != '' ) {
			queryString = '/?' + queryString
		}
		return this.http.get( this.itemsUrl + queryString )
		           .toPromise()
		           .then( 
		           		response => 
		           			response.json() as Item[] 
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
    //-----------------------------------------------------------------------------
	getImageList( queryString: string ): Promise<string[]> {
		if ( queryString != '' ) {
			queryString = '/?' + queryString
		}
		return this.http.get( this.itemImagesUrl + queryString )
		           .toPromise()
		           .then( 
		           		response => 
		           			response.json() as string[] 
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
    //-----------------------------------------------------------------------------
	getItemPropertiesList( queryString: string ): Promise<string[]> {
		if ( queryString != '' ) {
			queryString = '/?' + queryString
		}
		return this.http.get( this.itemPropertiesUrl + queryString )
		           .toPromise()
		           .then( 
		           		response => 
		           			response.json()
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
	//-----------------------------------------------------------------------------
	getCategoryHierarchy(): Promise<CategoryNode[]> {
		return this.http.get( this.categoryHierarchyUrl )
		           .toPromise()
		           .then( 
		           		response => response.json() as CategoryNode[]
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
	//-----------------------------------------------------------------------------
	getDiscountItems(): Promise<Item[]> {
		return this.http.get( this.discountItemsUrl )
		           .toPromise()
		           .then( 
		           		response => response.json() as Item[]
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
	//-----------------------------------------------------------------------------
	getCarriers(): Promise<Carrier[]> {
		return this.http.get( this.carriersUrl )
		           .toPromise()
		           .then( 
		           		response => response.json() as Carrier[]
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
    //-----------------------------------------------------------------------------
	getAvailableProperties( queryString: string ): Promise<ItemProperty[]> {
		if ( queryString != '' ) {
			queryString = '/?' + queryString
		}
		return this.http.get( this.availablePropertiesUrl + queryString )
		           .toPromise()
		           .then( 
		           		response => 
		           			response.json()
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
	//-----------------------------------------------------------------------------
	postOrder( orderData: any ): Promise<string> {
		let headers = new Headers( { 'Content-Type': 'application/json' } );
    	let options = new RequestOptions( { headers: headers } );		

		return this.http.post( this.orderUrl, JSON.stringify( orderData ), options )
		           .toPromise()
		           .then( 
		           		response => response.json()
		           	)
		           .catch( 
		           		error => 
		           			console.log( error )
		           	);
	}
}