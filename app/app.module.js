"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//import { TextMaskModule } from 'angular2-text-mask';
var angular_2_local_storage_1 = require('angular-2-local-storage');
var demo_shop_component_1 = require('./demo.shop.component');
var filter_component_1 = require('./filter.component');
var item_component_1 = require('./item.component');
var item_list_component_1 = require('./item.list.component');
var shopping_cart_component_1 = require('./shopping.cart.component');
var slider_component_1 = require('./slider.component');
var category_tree_component_1 = require('./category.tree.component');
var order_form_component_1 = require('./order.form.component');
var data_service_1 = require('./data.service');
var routing_module_1 = require('./routing.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                routing_module_1.TrialRoutingModule,
                //TextMaskModule,
                http_1.HttpModule,
                angular_2_local_storage_1.LocalStorageModule.withConfig({
                    prefix: 'demo-shop',
                    storageType: 'localStorage'
                })
            ],
            declarations: [demo_shop_component_1.DemoShop,
                filter_component_1.FilterComponent,
                item_component_1.ItemComponent,
                item_list_component_1.ItemListComponent,
                shopping_cart_component_1.ShoppingCartComponent,
                slider_component_1.SliderComponent,
                category_tree_component_1.CategoryTreeComponent,
                order_form_component_1.OrderFormComponent],
            providers: [data_service_1.DataService],
            bootstrap: [demo_shop_component_1.DemoShop]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map