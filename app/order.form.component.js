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
var common_1 = require('@angular/common');
var data_service_1 = require('./data.service');
var OrderFormComponent = (function () {
    //[textMask]='{mask: mask}'
    //-----------------------------------------------------------------------------
    function OrderFormComponent(dataService, location) {
        this.dataService = dataService;
        this.location = location;
        this.orderRows = [];
        this.total = 0;
        this.totalPlusShipment = 0;
        this.firstName = '';
        this.secondName = '';
        this.email = '';
        this.validEmail = true;
        this.phoneNumber = '';
        this.carriers = [];
        this.paymnetType = 'Cash';
        this.orderNumber = 0;
        this.displayMessage = false;
        this.mask = ['(', ')'];
    }
    //-----------------------------------------------------------------------------
    OrderFormComponent.prototype.ngOnInit = function () {
        this.total = this.dataService.getShoppingCartTotal();
        this.orderRows = this.dataService.getShoppingCartRows();
        this.getCarriers();
    };
    //-----------------------------------------------------------------------------
    OrderFormComponent.prototype.getCarriers = function () {
        var _this = this;
        this.dataService
            .getCarriers()
            .then(function (carriers) {
            _this.carriers = carriers;
            if (_this.carriers.length > 0) {
                _this.selectedCarrier = _this.carriers[0];
                _this.totalPlusShipment = _this.total + _this.selectedCarrier.cost;
            }
        });
    };
    //-----------------------------------------------------------------------------
    OrderFormComponent.prototype.selectCarrier = function (carrier) {
        this.selectedCarrier = carrier;
        this.totalPlusShipment = this.total + this.selectedCarrier.cost;
    };
    //-----------------------------------------------------------------------------
    OrderFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    //-----------------------------------------------------------------------------
    OrderFormComponent.prototype.postOrder = function () {
        var _this = this;
        var order = {};
        order['total'] = this.total;
        order['totalPlusShipment'] = this.totalPlusShipment;
        order['firstName'] = this.firstName;
        order['secondName'] = this.secondName;
        order['email'] = this.email;
        order['phoneNumber'] = this.phoneNumber;
        order['paymnetType'] = this.paymnetType;
        order['carrier'] = this.selectedCarrier;
        order['orderRows'] = this.orderRows;
        this.dataService.postOrder(order).then(function (result) {
            _this.orderNumber = result['orderNumber'];
            _this.displayMessage = true;
        });
    };
    OrderFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order-form',
            templateUrl: './order.form.component.html',
            styleUrls: ['./order.form.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, common_1.Location])
    ], OrderFormComponent);
    return OrderFormComponent;
}());
exports.OrderFormComponent = OrderFormComponent;
//# sourceMappingURL=order.form.component.js.map