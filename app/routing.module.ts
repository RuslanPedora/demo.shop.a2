import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent }     from './item.list.component';
import { ItemComponent }         from './item.component';
import { ShoppingCartComponent } from './shopping.cart.component';
import { SliderComponent }       from './slider.component';
import { OrderFormComponent }    from './order.form.component';

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