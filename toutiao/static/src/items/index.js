define('src/items/index', ['src/items/base', 'src/items/single-pic', 'src/items/multiple-pic', 'src/items/big-pic'], function (base, singlePic, multiplePic, bigPic) {

    // 自己写了个继承
    function inherit(originClass, superClass) {

        function mixedClass() {
            superClass.apply(this, arguments);
            originClass.apply(this, arguments);
        };

        originClass.__proto__ = superClass;
        mixedClass.__proto__ = originClass;
        mixedClass.prototype = Object.create(superClass.prototype);
        for (var i in originClass.prototype) {
            mixedClass.prototype[i] = originClass.prototype[i];
        }
        mixedClass.prototype.constructor = originClass;

        return mixedClass;
    }

    return {
        base: base,
        singlePic: inherit(singlePic, base),
        multiplePic: inherit(multiplePic, base),
        bigPic: inherit(bigPic, base)
    };

});
