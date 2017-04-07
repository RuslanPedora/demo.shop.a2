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
var common_1 = require('@angular/common');
var data_service_1 = require('./data.service');
var ShoppingCartComponent = (function () {
    //-----------------------------------------------------------------------------
    function ShoppingCartComponent(location, dataService, router) {
        this.location = location;
        this.dataService = dataService;
        this.router = router;
        this.orderRows = [];
    }
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.ngOnInit = function () {
        this.orderRows = this.dataService.getShoppingCartRows();
        this.total = this.dataService.getShoppingCartTotal();
        this.imagePath = this.dataService.getImagesPath();
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.showItemDetail = function (item) {
        var paramString = ('{"' + this.dataService.getItemKeyPrefix() +
            this.dataService.getItemTablePrefix() +
            'id":"' + item.id + '"}');
        this.router.navigate(['/item'], { queryParams: JSON.parse(paramString) });
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.addItem = function (item, fixedQuiantity) {
        if (fixedQuiantity == undefined)
            this.dataService.addItemToShoppingCart(item);
        else
            this.dataService.addItemToShoppingCart(item, fixedQuiantity);
        this.orderRows = this.dataService.getShoppingCartRows();
        this.total = this.dataService.getShoppingCartTotal();
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.deleteItem = function (item) {
        this.dataService.deleteItemToShoppingCart(item);
        this.orderRows = this.dataService.getShoppingCartRows();
        this.total = this.dataService.getShoppingCartTotal();
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.goToItemList = function () {
        this.dataService.goToItemList();
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.goBack = function () {
        this.location.back();
    };
    //-----------------------------------------------------------------------------
    ShoppingCartComponent.prototype.placeOrder = function () {
        this.router.navigate(['/order-form']);
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'shopping-cart',
            templateUrl: './shopping.cart.component.html',
            styleUrls: ['./shopping.cart.component.css']
        }), 
        __metadata('design:paramtypes', [common_1.Location, data_service_1.DataService, router_1.Router])
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
//# sourceMappingURL=shopping.cart.component.js.map