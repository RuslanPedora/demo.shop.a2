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
var angular_2_local_storage_1 = require('angular-2-local-storage');
var data_service_1 = require('./data.service');
var ItemListComponent = (function () {
    //-----------------------------------------------------------------------------
    function ItemListComponent(router, activatedRoute, dataService, localStorageService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.itemList = [];
        this.queryString = 'query string';
        this.sortedByNameAsc = true;
        this.sortedByNameDes = false;
        this.sortedByPriceAsc = false;
        this.sortedByPriceDes = false;
        this.shownAsList = true;
        this.pages = [];
        this.itemPerPage = 25;
        this.currentPage = -1;
    }
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.dataService.getImagesPath();
        this.restoreFromLocalStorage();
        this.activatedRoute.queryParams.subscribe(function (queryParams) {
            var keyPrefix = _this.dataService.getItemListKeyPrefix();
            var propertyWithoutPrefix = '';
            var paramValue;
            var newFilter = {};
            var newQueryString = '';
            for (var property in queryParams) {
                if (property.indexOf(keyPrefix) >= 0) {
                    propertyWithoutPrefix = property.replace(keyPrefix, '');
                    paramValue = queryParams[property];
                    if (paramValue.indexOf(',') > 0)
                        newFilter[propertyWithoutPrefix] = paramValue.split(',');
                    else
                        newFilter[propertyWithoutPrefix] = paramValue;
                }
            }
            if (Object.keys(newFilter).length > 0)
                newQueryString = JSON.stringify(newFilter);
            else
                newQueryString = '';
            if (newQueryString != _this.queryString) {
                _this.queryString = newQueryString;
                _this.getItems(_this.queryString);
            }
        });
    };
    //----------------------------------------------------------------------------
    ItemListComponent.prototype.restoreFromLocalStorage = function () {
        var restoredValue;
        restoredValue = this.localStorageService.get('demoShopShownAsList');
        if (restoredValue != undefined)
            this.shownAsList = restoredValue;
        restoredValue = this.localStorageService.get('demoShopItemPerPage');
        if (restoredValue != undefined)
            this.itemPerPage = restoredValue;
        restoredValue = this.localStorageService.get('demoShopSortedByNameAsc');
        if (restoredValue != undefined) {
            this.sortedByNameAsc = restoredValue;
        }
        restoredValue = this.localStorageService.get('demoShopSortedByNameDes');
        if (restoredValue != undefined) {
            this.sortedByNameDes = restoredValue;
        }
        restoredValue = this.localStorageService.get('demoShopSortedByPriceAsc');
        if (restoredValue != undefined) {
            this.sortedByPriceAsc = restoredValue;
        }
        restoredValue = this.localStorageService.get('demoShopSortedByPriceDes');
        if (restoredValue != undefined) {
            this.sortedByPriceDes = restoredValue;
        }
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.storeSorting = function () {
        this.localStorageService.set('demoShopSortedByNameAsc', this.sortedByNameAsc);
        this.localStorageService.set('demoShopSortedByNameDes', this.sortedByNameDes);
        this.localStorageService.set('demoShopSortedByPriceAsc', this.sortedByPriceAsc);
        this.localStorageService.set('demoShopSortedByPriceDes', this.sortedByPriceDes);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.sortByNameAsc = function () {
        this.sortedByNameAsc = true;
        this.sortedByNameDes = false;
        this.sortedByPriceAsc = false;
        this.sortedByPriceDes = false;
        this.itemList.sort(function (a, b) { return a.name < b.name ? -1 : 1; });
        this.storeSorting();
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.sortByNameDes = function () {
        this.sortedByNameAsc = false;
        this.sortedByNameDes = true;
        this.sortedByPriceAsc = false;
        this.sortedByPriceDes = false;
        this.itemList.sort(function (a, b) { return a.name > b.name ? -1 : 1; });
        this.storeSorting();
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.sortByPriceAsc = function () {
        this.sortedByNameAsc = false;
        this.sortedByNameDes = false;
        this.sortedByPriceAsc = true;
        this.sortedByPriceDes = false;
        this.itemList.sort(function (a, b) { return a.price < b.price ? -1 : 1; });
        this.storeSorting();
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.sortByPriceDes = function () {
        this.sortedByNameAsc = false;
        this.sortedByNameDes = false;
        this.sortedByPriceAsc = false;
        this.sortedByPriceDes = true;
        this.itemList.sort(function (a, b) { return a.price > b.price ? -1 : 1; });
        this.storeSorting();
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.showAsList = function (value) {
        this.shownAsList = value;
        this.localStorageService.set('demoShopShownAsList', value);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.showItemDetail = function (item) {
        var paramString = ('{"' + this.dataService.getItemKeyPrefix() +
            this.dataService.getItemTablePrefix() +
            'id":"' + item.id + '"}');
        this.router.navigate(['/item'], { queryParams: JSON.parse(paramString) });
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.addItemToShoppingCart = function (item) {
        this.dataService.addItemToShoppingCart(item);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.deleteItemToShoppingCart = function (item) {
        this.dataService.deleteItemToShoppingCart(item);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.getItems = function (query) {
        var _this = this;
        this.dataService
            .getItemList(query)
            .then(function (itemList) {
            _this.itemList = itemList;
            _this.currentPage = -1;
            if (_this.sortedByNameAsc)
                _this.sortByNameAsc();
            if (_this.sortedByNameDes)
                _this.sortByNameDes();
            if (_this.sortedByPriceAsc)
                _this.sortByPriceAsc();
            if (_this.sortedByPriceDes)
                _this.sortByPriceDes();
            _this.initPages();
        });
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.initPages = function () {
        var pagesCount = 0;
        this.pages = [];
        this.firstElemntInc = 0;
        this.lastElemntExc = this.itemList.length;
        if (this.itemList.length <= this.itemPerPage || this.itemPerPage == 0)
            return;
        pagesCount = Math.ceil(this.itemList.length / this.itemPerPage);
        for (var i = 0; i < pagesCount; i++)
            this.pages.push(i);
        this.setCurrentPage(0);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.setCurrentPage = function (value) {
        if (this.currentPage == value) {
            return;
        }
        this.currentPage = value;
        this.firstElemntInc = value * this.itemPerPage;
        this.lastElemntExc = Math.min(this.firstElemntInc + this.itemPerPage, this.itemList.length);
    };
    //-----------------------------------------------------------------------------
    ItemListComponent.prototype.changeItemsPerPage = function (value) {
        this.itemPerPage = Number.parseInt(value);
        this.localStorageService.set('demoShopItemPerPage', this.itemPerPage);
        this.currentPage = -1;
        this.initPages();
    };
    ItemListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'item-list',
            templateUrl: './item.list.component.html',
            styleUrls: ['./item.list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, data_service_1.DataService, angular_2_local_storage_1.LocalStorageService])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=item.list.component.js.map