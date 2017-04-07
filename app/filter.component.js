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
var category_node_1 = require('./category.node');
var item_property_1 = require('./item.property');
var item_property_container_1 = require('./item.property.container');
var FilterComponent = (function () {
    //-----------------------------------------------------------------------------
    function FilterComponent(dataService, router, localStorageService) {
        this.dataService = dataService;
        this.router = router;
        this.localStorageService = localStorageService;
        this.categoryTree = [];
        this.categoryId = 0;
        this.categoryName = '';
        this.showAsCategoryTree = true;
        this.selectedProperties = [];
        this.availableProperties = [];
    }
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var restoredFilterValue;
        this.dataServiceListener = this.dataService.itemListEventSource.subscribe(function (message) {
            return _this.refreshItemList();
        });
        this.categorySelectListener = this.dataService.categoryEventSource.subscribe(function (categoryNode) {
            return _this.processCategorySelect(categoryNode);
        });
        this.getCategoryHierarchy();
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.ngOnDestroy = function () {
        this.dataServiceListener.unsubscribe();
        this.categorySelectListener.unsubscribe();
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.processCategorySelect = function (categoryNode) {
        if (this.categoryId != categoryNode.id || categoryNode.level == -1) {
            this.categoryId = categoryNode.id;
            this.categoryName = categoryNode.name;
            this.selectedProperties = [];
            this.refreshItemList();
            this.refreshAvailableProperties();
            this.showAsCategoryTree = false;
        }
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.getCategoryHierarchy = function () {
        var _this = this;
        this.dataService
            .getCategoryHierarchy()
            .then(function (categoryHierarchy) {
            return _this.createCategoryTree(_this.categoryTree, categoryHierarchy);
        });
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.createCategoryTree = function (categoryTree, categoryList, parent) {
        var currentLeveNodes;
        var node;
        if (parent == undefined)
            currentLeveNodes = categoryList.filter(function (element) { return element.parentId == null; });
        else
            currentLeveNodes = categoryList.filter(function (element) { return element.parentId == parent.id; });
        for (var index in currentLeveNodes) {
            node = new category_node_1.CategoryNode(currentLeveNodes[index].id, currentLeveNodes[index].name);
            node.level = parent == undefined ? 0 : parent.level + 1;
            node.parentId = parent == undefined ? 0 : parent.id;
            node.subNodes = [];
            this.createCategoryTree(node.subNodes, categoryList, node);
            node.subMenu = node.subNodes.length > 0;
            categoryTree.push(node);
        }
        if (parent == undefined) {
            node = new category_node_1.CategoryNode(0, 'All');
            node.level = 0;
            node.subNodes = [];
            node.subMenu = node.subNodes.length > 0;
            categoryTree.push(node);
        }
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.changeLowPrice = function (value) {
        this.lowPrice = value;
        this.refreshAvailableProperties();
        this.refreshItemList();
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.changeHighPrice = function (value) {
        this.highPrice = value;
        this.refreshAvailableProperties();
        this.refreshItemList();
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.refreshItemList = function (value) {
        var filterObject = {};
        var valueArray = [];
        var some;
        for (var i in this.selectedProperties) {
            filterObject[this.dataService.getItemListKeyPrefix() +
                'propertyId_' + i] = this.selectedProperties[i].itemProperty.id;
            filterObject[this.dataService.getItemListKeyPrefix() +
                'value_' + i] = this.selectedProperties[i].itemPropertyList.map(function (element) { return element.value; });
        }
        if (this.categoryId != 0)
            filterObject[this.dataService.getItemListKeyPrefix() +
                this.dataService.getItemTablePrefix() +
                'categoryId'] = this.categoryId;
        if (this.lowPrice != 0 && this.lowPrice != undefined)
            filterObject[this.dataService.getItemListKeyPrefix() +
                this.dataService.getItemTablePrefix() +
                'lowPrice'] = this.lowPrice;
        if (this.highPrice != 0 && this.highPrice != undefined)
            filterObject[this.dataService.getItemListKeyPrefix() +
                this.dataService.getItemTablePrefix() +
                'highPrice'] = this.highPrice;
        this.navigateItemList(filterObject);
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.navigateItemList = function (filterObject) {
        if (filterObject == undefined || Object.keys(filterObject).length == 0)
            this.router.navigate(['/item-list']);
        else
            this.router.navigate(['/item-list'], { queryParams: filterObject });
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.refreshAvailableProperties = function () {
        var _this = this;
        var filterObject = {};
        var valueObject = {};
        filterObject[this.dataService.getItemTablePrefix() + 'categoryId'] = this.categoryId;
        if (this.lowPrice != 0 && this.lowPrice != undefined)
            filterObject[this.dataService.getItemTablePrefix() + 'lowPrice'] = this.lowPrice;
        if (this.highPrice != 0 && this.highPrice != undefined)
            filterObject[this.dataService.getItemTablePrefix() + 'highPrice'] = this.highPrice;
        for (var i in this.selectedProperties) {
            valueObject = {};
            valueObject['propertyId' + this.dataService.getPropertyTablePrefix()] =
                this.selectedProperties[i].itemProperty.id;
            valueObject['value' + this.dataService.getPropertyTablePrefix()] =
                this.selectedProperties[i].itemPropertyList.map(function (element) { return element.value; });
            filterObject['propertyContainer' + i] = valueObject;
        }
        this.dataService
            .getAvailableProperties(JSON.stringify(filterObject))
            .then(function (availableProperties) {
            return _this.createAvailableProperties(availableProperties);
        });
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.createAvailableProperties = function (availableProperties) {
        var currentPropertyId = 0;
        var currentContainer;
        this.availableProperties = [];
        for (var i in availableProperties) {
            if (currentPropertyId != availableProperties[i]['propertyId']) {
                if (currentPropertyId != 0) {
                    this.availableProperties.push(currentContainer);
                }
                currentPropertyId = availableProperties[i]['propertyId'];
                currentContainer = new item_property_container_1.ItemPropertyContainer(new item_property_1.ItemProperty(availableProperties[i]['propertyId'], availableProperties[i]['propertyName'], ''));
            }
            currentContainer.itemPropertyList.push(new item_property_1.ItemProperty(availableProperties[i]['propertyId'], availableProperties[i]['propertyName'], availableProperties[i]['value']));
        }
        if (availableProperties.length > 0)
            this.availableProperties.push(currentContainer);
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.addToSelectedProperties = function (value) {
        var neededContainer;
        neededContainer = this.selectedProperties.find(function (element) { return element.itemProperty.id == value.id; });
        if (neededContainer == undefined) {
            neededContainer = new item_property_container_1.ItemPropertyContainer(new item_property_1.ItemProperty(value['id'], value['name'], ''));
            neededContainer.itemPropertyList.push(new item_property_1.ItemProperty(value['id'], value['name'], value['value']));
            this.selectedProperties.push(neededContainer);
        }
        else {
            neededContainer.itemPropertyList.push(value);
        }
        this.refreshAvailableProperties();
        this.refreshItemList();
    };
    //-----------------------------------------------------------------------------
    FilterComponent.prototype.deleteToSelectedProperties = function (value) {
        var neededContainer;
        var neededIndex;
        neededContainer = this.selectedProperties.find(function (element) { return element.itemProperty.id == value.id; });
        neededIndex = neededContainer.itemPropertyList.findIndex(function (element) { return element.value == value.value; });
        neededContainer.itemPropertyList.splice(neededIndex, 1);
        if (neededContainer.itemPropertyList.length == 0) {
            neededIndex = this.selectedProperties.findIndex(function (element) { return element.itemProperty.id == value.id; });
            this.selectedProperties.splice(neededIndex, 1);
        }
        this.refreshAvailableProperties();
        this.refreshItemList();
    };
    FilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filter',
            templateUrl: './filter.component.html',
            styleUrls: ['./filter.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, angular_2_local_storage_1.LocalStorageService])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map