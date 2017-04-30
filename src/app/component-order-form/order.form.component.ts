import { Component,
         OnInit }         from '@angular/core';
import { Location }       from '@angular/common';


import { DataService } from 'services/data.service';
import { Item }        from 'mycore/item';  
import { OrderRow }    from 'mycore/order.row';
import { Carrier }     from 'mycore/carrier';

@Component( {
	moduleId: module.id,
	selector: 'order-form',
	templateUrl: './order.form.component.html',
	styleUrls: [ './order.form.component.css' ]
})
//-----------------------------------------------------------------------------
export class OrderFormComponent implements OnInit {
	private orderRows: OrderRow[] = [];
	private total: number = 0;
	private totalPlusShipment: number = 0;
	private firstName: string = '';
	private secondName: string = '';
	private email: string = '';
	private validEmail: boolean = true;
	private phoneNumber: string = '';
	private carriers: Carrier[] = [];
	private selectedCarrier: Carrier;
	private paymnetType: string = 'Cash';
	private orderNumber: number  = 0;
	private displayMessage: boolean = false;
	private comment: string = '';
	private mask = [ '(' , ')' ];
	//[textMask]='{mask: mask}'
	//-----------------------------------------------------------------------------
	constructor( private dataService: DataService,
	             private location: Location ) {
	}
	//-----------------------------------------------------------------------------
	ngOnInit(): void {
		this.total     = this.dataService.getShoppingCartTotal();
		this.orderRows = this.dataService.getShoppingCartRows();
		this.getCarriers();
	}
	//-----------------------------------------------------------------------------
	getCarriers(): void {
		this.dataService
        	.getCarriers()
        	.then( 
        		carriers => { this.carriers = carriers;
        					  if( this.carriers.length > 0 ) {
        					  	this.selectedCarrier   = this.carriers[ 0 ];
        					  	this.totalPlusShipment = this.total + this.selectedCarrier.cost;
        					  }		
        					}
        	);		
	}	
	//-----------------------------------------------------------------------------
	selectCarrier( carrier: Carrier ): void {
		this.selectedCarrier = carrier;
		this.totalPlusShipment = this.total + this.selectedCarrier.cost;
	}
	//-----------------------------------------------------------------------------
	goBack(): void {
		this.location.back();
	}
	//-----------------------------------------------------------------------------
	postOrder(): void {
		let order = {};

		order[ 'total' ] = this.total;
		order[ 'totalPlusShipment' ] = this.totalPlusShipment;
		order[ 'firstName' ]         = this.firstName;
		order[ 'secondName' ]        = this.secondName;
		order[ 'email' ]             = this.email;
		order[ 'phoneNumber' ]       = this.phoneNumber;
		order[ 'paymnetType' ]       = this.paymnetType;
		order[ 'carrier' ]           = this.selectedCarrier;
		order[ 'orderRows' ]         = this.orderRows;
		order[ 'comment' ]           = this.comment;

		this.dataService.postOrder( order ).then( 
			result => {
				this.orderNumber    = result[ 'orderNumber' ];
				this.displayMessage = true;
			}
		);
	}
	//-----------------------------------------------------------------------------
}