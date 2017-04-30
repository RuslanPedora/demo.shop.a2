"use strict";
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
exports.Point = Point;
//# sourceMappingURL=point.js.map