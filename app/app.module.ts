import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
//import { TextMaskModule } from 'angular2-text-mask';

import { LocalStorageModule } from 'angular-2-local-storage';

import { DemoShop }              from './demo.shop.component';
import { FilterComponent }       from './filter.component';
import { ItemComponent }         from './item.component';
import { ItemListComponent }     from './item.list.component';
import { ShoppingCartComponent } from './shopping.cart.component';
import { SliderComponent }       from './slider.component';
import { CategoryTreeComponent } from './category.tree.component';
import { OrderFormComponent }    from './order.form.component';

import { DataService } from './data.service';

import { TrialRoutingModule } from './routing.module';

@NgModule({
  imports: [ BrowserModule, 
             FormsModule, 
             TrialRoutingModule, 
             //TextMaskModule,
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