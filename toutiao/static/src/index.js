/**
 * @file 入口文件
 */
define('src/index', function (require) {
    var utils = require('src/utils/index');

    var THRESHOLD = 100;

    function Manager() {}

    Manager.prototype = {

        init: function () {
            this.container = document.getElementById('container');
            this.appendData();
            const context = this;
            this.listen(function () {
                context.appendData();
            });
        },

        appendData: function () {
            var context = this;
            utils.request({
                    url: 'http://localhost:8099/list'
                }, function (res) {
                    context.appendItems(res.data);
                });
        },

        appendItems: function (items) {
            this.render(this.container, items);
        },

        render: function ($root, items) {

            var $container = document.createDocumentFragment();
            
            var elements = items.map(function (item) {
                var components = require('src/items/index');
                var component = new components[item.type](item);
                var element = component._constructElement();
                $container.appendChild(element);
            });

            $root.appendChild($container);
        },

        listen: function (cb) {
            window.onscroll = function (e) {
                var distance = document.documentElement.offsetHeight - window.screen.height - window.scrollY;
                if (distance < THRESHOLD) {
                    cb && cb();
                }
            };
        }
    };

    return new Manager();
});
