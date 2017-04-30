import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent }     from 'myapp/component-item-list/item.list.component';
import { ItemComponent }         from 'myapp/component-item/item.component';
import { ShoppingCartComponent } from 'myapp/component-shopping-cart/shopping.cart.component';
import { SliderComponent }       from 'myapp/component-slider/slider.component';
import { OrderFormComponent }    from 'myapp/component-order-form/order.form.component';

const routes: Routes = [
	{ path: '', redirectTo: '/slider', pathMatch: 'full' },
	{ path: 'item', component: ItemComponent },
	{ path: 'item-list', component: ItemListComponent },
	{ path: 'shopping-cart', component: ShoppingCartComponent },
	{ path: 'order-form', component: OrderFormComponent },	
	{ path: 'slider', component: SliderComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
})

export class TrialRoutingModule {
}