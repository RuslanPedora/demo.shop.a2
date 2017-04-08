import { Component,
         OnInit, 
         OnDestroy }   from '@angular/core';
import { Router }      from '@angular/router';

import { DataService } from './data.service';
import { Item }        from './item';        

@Component( {
	moduleId: module.id,
	selector: 'slider',
	templateUrl: './slider.component.html',
	styleUrls: [ './slider.component.css' ]
})
//-----------------------------------------------------------------------------
export class SliderComponent implements OnInit, OnDestroy {
	private debugStr: string = 'debug string';
	private itemList: Item[] = [];
	private viewList: Point[] = [];
	private trackMouseMotion: boolean = false;
	private imagePath: string;
	private angle:number = Math.PI / 90;
	private objectAmount: number;
	private radius: number = 34;
	private center: number = 50;
	private imageWidth: number = 20;
	private intervalProcessor: any;
	//-----------------------------------------------------------------------------
	constructor( private router: Router,
	             private dataService: DataService ) {
		//this.intervalProcessor = setInterval( () => { this.yPlus( 2 * Math.PI / this.objectAmount ) }, 5000 );
	}
	//-----------------------------------------------------------------------------
	ngOnInit() {		
		this.getItems();
		this.imagePath = this.dataService.getImagesPath();
	}
	//-----------------------------------------------------------------------------
	ngOnDestroy() {
		clearInterval( this.intervalProcessor );
	}
	//-----------------------------------------------------------------------------
	getItems(): void {
		this.dataService
        	.getDiscountItems()
        	.then( 
        		itemList => this.itemList = itemList 
        	).then( itemList => this.viewListInit() );
	}
	//-----------------------------------------------------------------------------
	mouseDown( event: any ): void {
		this.trackMouseMotion = true;		
	}
	//-----------------------------------------------------------------------------
	mouseUp( event: any ): void {
		this.trackMouseMotion = false;		
	}
	//-----------------------------------------------------------------------------
	mouseMove( event: any ): void {
		let q: number;
		if( this.trackMouseMotion ) {
			if( event.movementX > 0 )
				this.yMinus();
			else if ( event.movementX < 0 )
				this.yPlus();
			if( event.movementY > 0 )
				this.xMinus();
			else if ( event.movementY < 0 )
				this.xPlus();
		}		
	}
	//-----------------------------------------------------------------------------
	scrollX( event: any ): void {
		if ( event.wheelDeltaY > 0 )
			this.xPlus();
		else
			this.xMinus();
	}
	//-----------------------------------------------------------------------------
	sortOrder( a: Point, b: Point ): number {
	 return ( a.z < b.z ? -1 : 1 );
	} 
	//-----------------------------------------------------------------------------
	resizeWidth( z: number ): number {
		return 5 + Math.round( this.imageWidth * ( 1 + z / this.radius) );
	}
	//-----------------------------------------------------------------------------
	viewListInit(): void {
		let x: number;
		let y: number;
		let z: number;
		let xView: number;
		let yView: number;
		let imageWidth: number;
		let i: any;

		this.objectAmount = this.itemList.length;
		this.angle        = Math.PI / 18;
		for( i in this.itemList ) {
			if( i == 0 ) {
				x = 0;
				y = this.radius;
				z = 0;
			}
			else if( i == 1 ) {
				x = 0;
				y = -this.radius;
				z = 0;
			}
			else if ( i < 6 ) {
				x = this.radius * Math.cos( i * Math.PI / 2 );
				y = 0;
				z = this.radius * Math.sin( i * Math.PI / 2 );
			}
			else if ( i < 8 ) {
				x = this.radius * Math.cos( Math.PI / 4 + i * Math.PI ) * Math.cos( Math.PI / 4 );
				y = this.radius * Math.cos( Math.PI / 4 );
				z = this.radius * Math.sin( Math.PI / 4 + i * Math.PI ) * Math.cos( Math.PI / 4 );
			}	
			else if ( i < 10 ) {
				x = this.radius * Math.cos( -Math.PI / 4 + i * Math.PI ) * Math.cos( Math.PI / 4 );
				y = -this.radius * Math.cos( Math.PI / 4 );
				z = this.radius * Math.sin( -Math.PI / 4 + i * Math.PI ) * Math.cos( Math.PI / 4 );
			} else 
				return;

			imageWidth = this.resizeWidth( z );
			xView = Math.round( this.center + x ) - imageWidth / 2;
			yView = Math.round( this.center + y ) - imageWidth / 2;
			this.viewList.push( new Point( this.itemList[ i ], x, y, z, xView, yView, imageWidth, imageWidth / this.imageWidth ) );
		}
		this.viewList.sort( this.sortOrder );
	}
	//-----------------------------------------------------------------------------
	zPlus(): void {
		let oldX: number;
		let oldY: number;
		for( let i in this.viewList ) {
			oldX = this.viewList[ i ].x;
			oldY = this.viewList[ i ].y;
			this.viewList[ i ].x = this.newX( oldX, oldY, this.angle );
			this.viewList[ i ].y = this.newY( oldX, oldY, this.angle );
			this.viewList[ i ].xView = Math.round( this.center + this.viewList[ i ].x ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].yView = Math.round( this.center + this.viewList[ i ].y ) - this.viewList[ i ].imageWidth / 2;
			if( this.viewList[ i ].xView + this.viewList[ i ].imageWidth > 100 ) {
				this.debugStr += ( this.viewList[ i ].xView + this.viewList[ i ].imageWidth ) + this.viewList[ i ].item.name;
			}
		}
	}
	//-----------------------------------------------------------------------------
	zMinus(): void {
		let oldX: number;
		let oldY: number;
		for( let i in this.viewList ) {
			oldX = this.viewList[ i ].x;
			oldY = this.viewList[ i ].y;
			this.viewList[ i ].x = this.newX( oldX, oldY, -this.angle );
			this.viewList[ i ].y = this.newY( oldX, oldY, -this.angle );
			this.viewList[ i ].xView = Math.round( this.center + this.viewList[ i ].x ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].yView = Math.round( this.center + this.viewList[ i ].y ) - this.viewList[ i ].imageWidth / 2;			
		}
	}
	//-----------------------------------------------------------------------------
	yPlus( parAngle?: number ): void {
		let oldX: number;
		let oldZ: number;
		let angle: number;
		for( let i in this.viewList ) {
			oldX = this.viewList[ i ].x;
			oldZ = this.viewList[ i ].z;
			if( parAngle == undefined )
				angle = this.angle;
			else
				angle = parAngle;
			this.viewList[ i ].x = this.newX( oldX, oldZ, angle );
			this.viewList[ i ].z = this.newY( oldX, oldZ, angle );			
			this.viewList[ i ].imageWidth = this.resizeWidth( this.viewList[ i ].z );
			this.viewList[ i ].xView = Math.round( this.center + this.viewList[ i ].x ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].scale = this.viewList[ i ].imageWidth / this.imageWidth;
		}
		this.viewList.sort( this.sortOrder );
	}
	//-----------------------------------------------------------------------------
	yMinus(): void {
		let oldX: number;
		let oldZ: number;
		for( let i in this.viewList ) {
			oldX = this.viewList[ i ].x;
			oldZ = this.viewList[ i ].z;
			this.viewList[ i ].x = this.newX( oldX, oldZ, -this.angle );
			this.viewList[ i ].z = this.newY( oldX, oldZ, -this.angle );			
			this.viewList[ i ].imageWidth = this.resizeWidth( this.viewList[ i ].z );
			this.viewList[ i ].xView = Math.round( this.center + this.viewList[ i ].x ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].scale = this.viewList[ i ].imageWidth / this.imageWidth;
		}
		this.viewList.sort( this.sortOrder );
	}
	//-----------------------------------------------------------------------------
	xPlus(): void {
		let oldY: number;
		let oldZ: number;
		for( let i in this.viewList ) {
			oldY = this.viewList[ i ].y;
			oldZ = this.viewList[ i ].z;
			this.viewList[ i ].y = this.newX( oldY, oldZ, this.angle );
			this.viewList[ i ].z = this.newY( oldY, oldZ, this.angle );			
			this.viewList[ i ].imageWidth = this.resizeWidth( this.viewList[ i ].z );
			this.viewList[ i ].yView = Math.round( this.center + this.viewList[ i ].y ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].scale = this.viewList[ i ].imageWidth / this.imageWidth;
		}
		this.viewList.sort( this.sortOrder );
	}
	//-----------------------------------------------------------------------------
	xMinus(): void {
		let oldY: number;
		let oldZ: number;
		for( let i in this.viewList ) {
			oldY = this.viewList[ i ].y;
			oldZ = this.viewList[ i ].z;
			this.viewList[ i ].y = this.newX( oldY, oldZ, -this.angle );
			this.viewList[ i ].z = this.newY( oldY, oldZ, -this.angle );			
			this.viewList[ i ].imageWidth = this.resizeWidth( this.viewList[ i ].z );
			this.viewList[ i ].yView = Math.round( this.center + this.viewList[ i ].y ) - this.viewList[ i ].imageWidth / 2;
			this.viewList[ i ].scale = this.viewList[ i ].imageWidth / this.imageWidth;
		}
		this.viewList.sort( this.sortOrder );
	}
	//-----------------------------------------------------------------------------
	newX( x: number, y: number, angle: number ): number {
		return ( x * Math.cos( angle ) - y * Math.sin( angle ) );
	}
	//-----------------------------------------------------------------------------
	newY( x: number, y: number, angle: number ): number {
		return ( x * Math.sin( angle ) + y * Math.cos( angle ) );
	}
	//-----------------------------------------------------------------------------
	routeItem( item: Item ): void {
		let paramString: string = ( '{"' + this.dataService.getItemKeyPrefix() +
			                               this.dataService.getItemTablePrefix() + 
			                               'id":"' + item.id + '"}' );
		this.router.navigate( [ '/item' ], { queryParams: JSON.parse( paramString ) } );
	}
}
//-----------------------------------------------------------------------------
class Point {
	item: Item;
	description: string;
	x: number;
	y: number;
	z: number;
	xView: number;
	yView: number;
	imageWidth: number;
	scale: number;
	constructor( item: Item, 
		         x: number, 
		         y: number, 
		         z:number, 
		         xView: number, 
		         yView: number,
		         imageWidth: number,
		         scale: number ) {
		this.item = item;
		this.description = item.name;
		this.x = x;
		this.y = y;
		this.z = z;
		this.xView = xView;
		this.yView = yView;
		this.imageWidth = imageWidth;		
		this.scale      = scale;
	}
}