import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
//import { TextMaskModule } from 'angular2-text-mask';

import { LocalStorageModule } from 'angular-2-local-storage';

import { DemoShop }              from './demo.shop.component';
import { FilterComponent }       from 'myapp/component-filter/filter.component';
import { ItemComponent }         from 'myapp/component-item/item.component';
import { ItemListComponent }     from 'myapp/component-item-list/item.list.component';
import { ShoppingCartComponent } from 'myapp/component-shopping-cart/shopping.cart.component';
import { SliderComponent }       from 'myapp/component-slider/slider.component';
import { CategoryTreeComponent } from 'myapp/component-category-tree/category.tree.component';
import { OrderFormComponent }    from 'myapp/component-order-form/order.form.component';

import { DataService } from 'services/data.service';

import { TrialRoutingModule } from './routing.module';

@NgModule({
  imports: [ BrowserModule, 
             FormsModule, 
             TrialRoutingModule, 
             HttpModule
             , LocalStorageModule.withConfig({
            				prefix: 'demo-shop',
             			storageType: 'localStorage'
        			 }) 
           ],
  declarations: [ DemoShop, 
                  FilterComponent, 
                  ItemComponent, 
                  ItemListComponent, 
                  ShoppingCartComponent,
                  SliderComponent,
                  CategoryTreeComponent,
                  OrderFormComponent ],
  providers: [ DataService ],
  bootstrap: [ DemoShop ]
})
export class AppModule { }