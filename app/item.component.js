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
var item_property_1 = require('./item.property');
var data_service_1 = require('./data.service');
var category_node_1 = require('./category.node');
var ItemComponent = (function () {
    //-----------------------------------------------------------------------------
    function ItemComponent(router, location, activatedRoute, dataService) {
        this.router = router;
        this.location = location;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.imageList = [];
        this.propertyList = [];
    }
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.dataService.getImagesPath();
        this.activatedRoute.queryParams.subscribe(function (queryParams) {
            var itemId = queryParams[_this.dataService.getItemKeyPrefix() +
                _this.dataService.getItemTablePrefix() + 'id'];
            if (itemId != undefined) {
                _this.getItem(Number.parseInt(itemId));
            }
        });
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.changeImage = function (newImage) {
        var imageElelemt;
        var dataObject;
        if (this.mainImage == newImage)
            return;
        imageElelemt = document.getElementById('mainImage');
        imageElelemt.style.opacity = 0;
        dataObject = this;
        setTimeout(function () {
            dataObject.mainImage = newImage;
            imageElelemt.style.opacity = 1;
        }, 1000);
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.goBack = function () {
        this.location.back();
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.goToItemList = function () {
        this.dataService.goToItemList();
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.addItemToShoppingCart = function () {
        this.dataService.addItemToShoppingCart(this.currentItem);
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.getItem = function (itemId) {
        var _this = this;
        this.dataService
            .getItemList(JSON.stringify({ _ITid: itemId }))
            .then(function (itemList) {
            if (itemList.length > 0) {
                _this.currentItem = itemList[0];
                _this.mainImage = _this.currentItem.mainImage;
                _this.getImageList();
                _this.getItemPropertyList();
            }
        });
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.getImageList = function () {
        var _this = this;
        this.dataService
            .getImageList(JSON.stringify({ id: this.currentItem.id }))
            .then(function (imageList) { return _this.imageList = imageList.map(function (element) { return element['imageSrc']; }); });
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.getItemPropertyList = function () {
        var _this = this;
        this.dataService
            .getItemPropertiesList(JSON.stringify({ id: this.currentItem.id }))
            .then(function (propertyList) { return _this.propertyList = propertyList.map(function (element) {
            return new item_property_1.ItemProperty(element['propertyId'], element['propertyName'], element['propertyValue']);
        }); });
    };
    //-----------------------------------------------------------------------------
    ItemComponent.prototype.goToCategory = function () {
        if (this.currentItem.categoryId != undefined)
            this.dataService.emitCategorySelectEvent(new category_node_1.CategoryNode(this.currentItem.categoryId, this.currentItem.category));
    };
    ItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'item',
            templateUrl: './item.component.html',
            styleUrls: ['./item.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, router_1.ActivatedRoute, data_service_1.DataService])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map