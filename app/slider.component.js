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
var SliderComponent = (function () {
    //-----------------------------------------------------------------------------
    function SliderComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.debugStr = 'debug string';
        this.itemList = [];
        this.viewList = [];
        this.trackMouseMotion = false;
        this.angle = Math.PI / 90;
        this.radius = 34;
        this.center = 50;
        this.imageWidth = 20;
        //this.intervalProcessor = setInterval( () => { this.yPlus( 2 * Math.PI / this.objectAmount ) }, 5000 );
    }
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.ngOnInit = function () {
        this.getItems();
        this.imagePath = this.dataService.getImagesPath();
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.intervalProcessor);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.getItems = function () {
        var _this = this;
        this.dataService
            .getDiscountItems()
            .then(function (itemList) { return _this.itemList = itemList; }).then(function (itemList) { return _this.viewListInit(); });
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.mouseDown = function (event) {
        this.trackMouseMotion = true;
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.mouseUp = function (event) {
        this.trackMouseMotion = false;
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.mouseMove = function (event) {
        var q;
        if (this.trackMouseMotion) {
            if (event.movementX > 0)
                this.yMinus();
            else if (event.movementX < 0)
                this.yPlus();
            if (event.movementY > 0)
                this.xMinus();
            else if (event.movementY < 0)
                this.xPlus();
        }
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.scrollX = function (event) {
        if (event.wheelDeltaY > 0)
            this.xPlus();
        else
            this.xMinus();
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.sortOrder = function (a, b) {
        return (a.z < b.z ? -1 : 1);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.resizeWidth = function (z) {
        return 5 + Math.round(this.imageWidth * (1 + z / this.radius));
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.viewListInit = function () {
        var x;
        var y;
        var z;
        var xView;
        var yView;
        var imageWidth;
        var i;
        this.objectAmount = this.itemList.length;
        this.angle = Math.PI / 18;
        for (i in this.itemList) {
            if (i == 0) {
                x = 0;
                y = this.radius;
                z = 0;
            }
            else if (i == 1) {
                x = 0;
                y = -this.radius;
                z = 0;
            }
            else if (i < 6) {
                x = this.radius * Math.cos(i * Math.PI / 2);
                y = 0;
                z = this.radius * Math.sin(i * Math.PI / 2);
            }
            else if (i < 8) {
                x = this.radius * Math.cos(Math.PI / 4 + i * Math.PI) * Math.cos(Math.PI / 4);
                y = this.radius * Math.cos(Math.PI / 4);
                z = this.radius * Math.sin(Math.PI / 4 + i * Math.PI) * Math.cos(Math.PI / 4);
            }
            else if (i < 10) {
                x = this.radius * Math.cos(-Math.PI / 4 + i * Math.PI) * Math.cos(Math.PI / 4);
                y = -this.radius * Math.cos(Math.PI / 4);
                z = this.radius * Math.sin(-Math.PI / 4 + i * Math.PI) * Math.cos(Math.PI / 4);
            }
            else
                return;
            imageWidth = this.resizeWidth(z);
            xView = Math.round(this.center + x) - imageWidth / 2;
            yView = Math.round(this.center + y) - imageWidth / 2;
            this.viewList.push(new Point(this.itemList[i], x, y, z, xView, yView, imageWidth, imageWidth / this.imageWidth));
        }
        this.viewList.sort(this.sortOrder);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.zPlus = function () {
        var oldX;
        var oldY;
        for (var i in this.viewList) {
            oldX = this.viewList[i].x;
            oldY = this.viewList[i].y;
            this.viewList[i].x = this.newX(oldX, oldY, this.angle);
            this.viewList[i].y = this.newY(oldX, oldY, this.angle);
            this.viewList[i].xView = Math.round(this.center + this.viewList[i].x) - this.viewList[i].imageWidth / 2;
            this.viewList[i].yView = Math.round(this.center + this.viewList[i].y) - this.viewList[i].imageWidth / 2;
            if (this.viewList[i].xView + this.viewList[i].imageWidth > 100) {
                this.debugStr += (this.viewList[i].xView + this.viewList[i].imageWidth) + this.viewList[i].item.name;
            }
        }
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.zMinus = function () {
        var oldX;
        var oldY;
        for (var i in this.viewList) {
            oldX = this.viewList[i].x;
            oldY = this.viewList[i].y;
            this.viewList[i].x = this.newX(oldX, oldY, -this.angle);
            this.viewList[i].y = this.newY(oldX, oldY, -this.angle);
            this.viewList[i].xView = Math.round(this.center + this.viewList[i].x) - this.viewList[i].imageWidth / 2;
            this.viewList[i].yView = Math.round(this.center + this.viewList[i].y) - this.viewList[i].imageWidth / 2;
        }
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.yPlus = function (parAngle) {
        var oldX;
        var oldZ;
        var angle;
        for (var i in this.viewList) {
            oldX = this.viewList[i].x;
            oldZ = this.viewList[i].z;
            if (parAngle == undefined)
                angle = this.angle;
            else
                angle = parAngle;
            this.viewList[i].x = this.newX(oldX, oldZ, angle);
            this.viewList[i].z = this.newY(oldX, oldZ, angle);
            this.viewList[i].imageWidth = this.resizeWidth(this.viewList[i].z);
            this.viewList[i].xView = Math.round(this.center + this.viewList[i].x) - this.viewList[i].imageWidth / 2;
            this.viewList[i].scale = this.viewList[i].imageWidth / this.imageWidth;
        }
        this.viewList.sort(this.sortOrder);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.yMinus = function () {
        var oldX;
        var oldZ;
        for (var i in this.viewList) {
            oldX = this.viewList[i].x;
            oldZ = this.viewList[i].z;
            this.viewList[i].x = this.newX(oldX, oldZ, -this.angle);
            this.viewList[i].z = this.newY(oldX, oldZ, -this.angle);
            this.viewList[i].imageWidth = this.resizeWidth(this.viewList[i].z);
            this.viewList[i].xView = Math.round(this.center + this.viewList[i].x) - this.viewList[i].imageWidth / 2;
            this.viewList[i].scale = this.viewList[i].imageWidth / this.imageWidth;
        }
        this.viewList.sort(this.sortOrder);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.xPlus = function () {
        var oldY;
        var oldZ;
        for (var i in this.viewList) {
            oldY = this.viewList[i].y;
            oldZ = this.viewList[i].z;
            this.viewList[i].y = this.newX(oldY, oldZ, this.angle);
            this.viewList[i].z = this.newY(oldY, oldZ, this.angle);
            this.viewList[i].imageWidth = this.resizeWidth(this.viewList[i].z);
            this.viewList[i].yView = Math.round(this.center + this.viewList[i].y) - this.viewList[i].imageWidth / 2;
            this.viewList[i].scale = this.viewList[i].imageWidth / this.imageWidth;
        }
        this.viewList.sort(this.sortOrder);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.xMinus = function () {
        var oldY;
        var oldZ;
        for (var i in this.viewList) {
            oldY = this.viewList[i].y;
            oldZ = this.viewList[i].z;
            this.viewList[i].y = this.newX(oldY, oldZ, -this.angle);
            this.viewList[i].z = this.newY(oldY, oldZ, -this.angle);
            this.viewList[i].imageWidth = this.resizeWidth(this.viewList[i].z);
            this.viewList[i].yView = Math.round(this.center + this.viewList[i].y) - this.viewList[i].imageWidth / 2;
            this.viewList[i].scale = this.viewList[i].imageWidth / this.imageWidth;
        }
        this.viewList.sort(this.sortOrder);
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.newX = function (x, y, angle) {
        return (x * Math.cos(angle) - y * Math.sin(angle));
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.newY = function (x, y, angle) {
        return (x * Math.sin(angle) + y * Math.cos(angle));
    };
    //-----------------------------------------------------------------------------
    SliderComponent.prototype.routeItem = function (item) {
        var paramString = ('{"' + this.dataService.getItemKeyPrefix() +
            this.dataService.getItemTablePrefix() +
            'id":"' + item.id + '"}');
        this.router.navigate(['/item'], { queryParams: JSON.parse(paramString) });
    };
    SliderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'slider',
            templateUrl: './slider.component.html',
            styleUrls: ['./slider.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, data_service_1.DataService])
    ], SliderComponent);
    return SliderComponent;
}());
exports.SliderComponent = SliderComponent;
//-----------------------------------------------------------------------------
var Point = (function () {
    function Point(item, x, y, z, xView, yView, imageWidth, scale) {
        this.item = item;
        this.description = item.name;
        this.x = x;
        this.y = y;
        this.z = z;
        this.xView = xView;
        this.yView = yView;
        this.imageWidth = imageWidth;
        this.scale = scale;
    }
    return Point;
}());
//# sourceMappingURL=slider.component.js.map