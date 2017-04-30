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
var router_1 = require('@angular/router');
var item_list_component_1 = require('myapp/component-item-list/item.list.component');
var item_component_1 = require('myapp/component-item/item.component');
var shopping_cart_component_1 = require('myapp/component-shopping-cart/shopping.cart.component');
var slider_component_1 = require('myapp/component-slider/slider.component');
var order_form_component_1 = require('myapp/component-order-form/order.form.component');
var routes = [
    { path: '', redirectTo: '/slider', pathMatch: 'full' },
    { path: 'item', component: item_component_1.ItemComponent },
    { path: 'item-list', component: item_list_component_1.ItemListComponent },
    { path: 'shopping-cart', component: shopping_cart_component_1.ShoppingCartComponent },
    { path: 'order-form', component: order_form_component_1.OrderFormComponent },
    { path: 'slider', component: slider_component_1.SliderComponent }
];
var TrialRoutingModule = (function () {
    function TrialRoutingModule() {
    }
    TrialRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], TrialRoutingModule);
    return TrialRoutingModule;
}());
exports.TrialRoutingModule = TrialRoutingModule;
//# sourceMappingURL=routing.module.js.map