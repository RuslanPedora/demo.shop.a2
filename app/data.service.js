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
var http_1 = require('@angular/http');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/toPromise');
var angular_2_local_storage_1 = require('angular-2-local-storage');
var order_row_1 = require('./order.row');
var DataService = (function () {
    //-----------------------------------------------------------------------------
    function DataService(http, localStorageService) {
        this.http = http;
        this.localStorageService = localStorageService;
        this.pixelPercm = 0;
        this.hideFilterWidth = 15;
        this.itemKeyPrefix = '_I';
        this.itemListKeyPrefix = '_IL';
        this.propertyTablePrefix = '_PT';
        this.itemTablePrefix = '_IT';
        this.hostUrl = 'http://localhost:8081';
        this.itemsUrl = this.hostUrl + '/items';
        this.orderUrl = this.hostUrl + '/order';
        this.discountItemsUrl = this.hostUrl + '/discount_items';
        this.itemImagesUrl = this.hostUrl + '/item_images';
        this.categoryHierarchyUrl = this.hostUrl + '/category_tree';
        this.itemPropertiesUrl = this.hostUrl + '/item_properties';
        this.availablePropertiesUrl = this.hostUrl + '/available_properties';
        this.carriersUrl = this.hostUrl + '/carriers';
        this.imagePath = this.hostUrl + '/app/images/';
        //-----------------------------------------------------------------------------
        this.shoppingCartEventEmitter = new Subject_1.Subject();
        this.itemListEventEmitter = new Subject_1.Subject();
        this.categoryEventEmitter = new Subject_1.Subject();
        //-----------------------------------------------------------------------------
        this.tempItemList = [];
        this.orderRows = [];
        var scaleElemnt;
        var parent;
        this.shoppingCartEventSource = this.shoppingCartEventEmitter.asObservable();
        this.itemListEventSource = this.itemListEventEmitter.asObservable();
        this.categoryEventSource = this.categoryEventEmitter.asObservable();
        scaleElemnt = document.getElementById('scale');
        this.pixelPercm = scaleElemnt.offsetWidth / 5;
        if (this.pixelPercm == 0)
            this.pixelPercm = 1;
        parent = document.getElementById('topic');
        parent.removeChild(scaleElemnt);
    }
    //----------------------------------------------------------------------------
    DataService.prototype.screenWidthCm = function (pixelWidth) {
        return pixelWidth / this.pixelPercm;
    };
    //----------------------------------------------------------------------------
    DataService.prototype.restoreFromLocalStorage = function () {
        var restoredValue;
        restoredValue = this.localStorageService.get('demoShopShoppingCart');
        try {
            this.orderRows = JSON.parse(restoredValue);
        }
        catch (error) {
        }
        this.emitShoppingCartEvent('');
    };
    //----------------------------------------------------------------------------
    DataService.prototype.getImagesPath = function () {
        return this.imagePath;
    };
    //----------------------------------------------------------------------------
    DataService.prototype.goToItemList = function () {
        this.itemListEventEmitter.next('');
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getShoppingCartTotal = function () {
        var result = 0;
        if (this.orderRows.length > 0)
            result = this.orderRows.map(function (element) { return element.total; }).reduce(function (total, sum) { return total + sum; });
        return result;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getShoppingCartRows = function () {
        return this.orderRows;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.addItemToShoppingCart = function (item, fixedQuiantity) {
        var neededRow;
        neededRow = this.orderRows.findIndex(function (element) { return element.item.id == item.id; });
        if (neededRow < 0)
            this.orderRows.push(new order_row_1.OrderRow(item));
        else {
            if (fixedQuiantity == undefined)
                this.orderRows[neededRow].quantity++;
            else
                this.orderRows[neededRow].quantity = fixedQuiantity;
            if (this.orderRows[neededRow].quantity <= 0) {
                this.deleteItemToShoppingCart(item);
                return;
            }
            this.orderRows[neededRow].total = this.orderRows[neededRow].quantity *
                this.orderRows[neededRow].item.discountPrice;
        }
        this.shoppingCartEventEmitter.next('');
        this.saveShoppingCart();
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.saveShoppingCart = function () {
        this.localStorageService.set('demoShopShoppingCart', JSON.stringify(this.orderRows));
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.deleteItemToShoppingCart = function (item) {
        var neededRow;
        var discount;
        neededRow = this.orderRows.findIndex(function (element) { return element.item.id == item.id; });
        if (neededRow >= 0) {
            this.orderRows[neededRow].quantity--;
            if (this.orderRows[neededRow].quantity <= 0)
                this.orderRows.splice(neededRow, 1);
            else {
                this.orderRows[neededRow].total = this.orderRows[neededRow].quantity *
                    this.orderRows[neededRow].item.discountPrice;
            }
            this.shoppingCartEventEmitter.next('');
            this.saveShoppingCart();
        }
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getItemKeyPrefix = function () {
        return this.itemKeyPrefix;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getItemListKeyPrefix = function () {
        return this.itemListKeyPrefix;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getPropertyTablePrefix = function () {
        return this.propertyTablePrefix;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getItemTablePrefix = function () {
        return this.itemTablePrefix;
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.emitCategorySelectEvent = function (categoryNode) {
        this.categoryEventEmitter.next(categoryNode);
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.emitShoppingCartEvent = function (eventName) {
        this.shoppingCartEventEmitter.next(eventName);
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getItemList = function (queryString) {
        if (queryString != '') {
            queryString = '/?' + queryString;
        }
        return this.http.get(this.itemsUrl + queryString)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getImageList = function (queryString) {
        if (queryString != '') {
            queryString = '/?' + queryString;
        }
        return this.http.get(this.itemImagesUrl + queryString)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getItemPropertiesList = function (queryString) {
        if (queryString != '') {
            queryString = '/?' + queryString;
        }
        return this.http.get(this.itemPropertiesUrl + queryString)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getCategoryHierarchy = function () {
        return this.http.get(this.categoryHierarchyUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getDiscountItems = function () {
        return this.http.get(this.discountItemsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getCarriers = function () {
        return this.http.get(this.carriersUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.getAvailableProperties = function (queryString) {
        if (queryString != '') {
            queryString = '/?' + queryString;
        }
        return this.http.get(this.availablePropertiesUrl + queryString)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return console.log(error);
        });
    };
    //-----------------------------------------------------------------------------
    DataService.prototype.postOrder = function (orderData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.orderUrl, JSON.stringify(orderData), options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            return console.log(error);
        });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular_2_local_storage_1.LocalStorageService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map