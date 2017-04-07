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
var data_service_1 = require('./data.service');
var CategoryTreeComponent = (function () {
    //-----------------------------------------------------------------------------
    function CategoryTreeComponent(dataService) {
        this.dataService = dataService;
        this.categoryList = [];
    }
    //-----------------------------------------------------------------------------
    CategoryTreeComponent.prototype.chooseCategory = function (categoryNode) {
        if (!categoryNode.subMenu)
            this.dataService.emitCategorySelectEvent(categoryNode);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CategoryTreeComponent.prototype, "categoryList", void 0);
    CategoryTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'category-tree',
            templateUrl: './category.tree.component.html',
            styleUrls: ['./category.tree.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], CategoryTreeComponent);
    return CategoryTreeComponent;
}());
exports.CategoryTreeComponent = CategoryTreeComponent;
//# sourceMappingURL=category.tree.component.js.map