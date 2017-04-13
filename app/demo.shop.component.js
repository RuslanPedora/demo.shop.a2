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
var data_service_1 = require('./data.service');
var DemoShop = (function () {
    //-----------------------------------------------------------------------------
    function DemoShop(dataService, router, ngZone) {
        this.dataService = dataService;
        this.router = router;
        this.ngZone = ngZone;
        this.eventValue = 0;
        this.nameMask = '';
        this.hideFilterWidth = 17;
    }
    //-----------------------------------------------------------------------------
    DemoShop.prototype.ngOnInit = function () {
        var _this = this;
        this.shoppingCartListener = this.dataService.shoppingCartEventSource.subscribe(function (eventValue) {
            return _this.eventValue = _this.dataService.getShoppingCartTotal();
        });
        this.dataService.restoreFromLocalStorage();
        this.alignFilterVisivility();
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.onResize = function (event) {
        this.alignFilterVisivility();
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.alignFilterVisivility = function () {
        this.showFilter = (this.dataService.screenWidthCm(window.innerWidth) > this.hideFilterWidth);
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.toggelFilter = function () {
        this.showFilter = !this.showFilter;
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.searchByName = function () {
        var filterObject = {};
        if (this.nameMask == '')
            this.routeItemList();
        else {
            filterObject[this.dataService.getItemListKeyPrefix() + this.dataService.getItemTablePrefix() + 'name'] = this.nameMask;
            this.routeItemList(JSON.stringify(filterObject));
        }
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.routeItemList = function (query) {
        if (query == undefined)
            this.dataService.goToItemList();
        else
            this.router.navigate(['/item-list'], { queryParams: JSON.parse(query) });
    };
    //-----------------------------------------------------------------------------
    DemoShop.prototype.ngOnDestroy = function () {
        this.shoppingCartListener.unsubscribe();
    };
    DemoShop = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo-shop',
            templateUrl: './demo.shop.component.html',
            styleUrls: ['./demo.shop.component.css'],
            host: {
                '(window:resize)': 'onResize($event)'
            }
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, core_1.NgZone])
    ], DemoShop);
    return DemoShop;
}());
exports.DemoShop = DemoShop;
//# sourceMappingURL=demo.shop.component.js.map