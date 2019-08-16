define('src/items/base', function () {

    function Base(props) {
        this.props = props;
    }

    Base.prototype = {

        render() {
            return '基础类，请重写render函数';
        },

        _eventTag(html) {
            var eventRegx = /y-on\:\w+\=['"]([^'"]*)['"]/g;
            return html.replace(eventRegx, function (code, funcName) {
                return code + ' data-event=' + funcName;
            });
        },

        _constructElement() {
            var html = this.render();
            var processedHTML = this._eventTag(html);
            var $content = document.createElement('div');
            var $container = document.createElement('div');
            $container.appendChild($content);
            $content.outerHTML = processedHTML;
            this.el = $container.firstChild;
            var hasEventElements = this.el.querySelectorAll('[data-event]')

            var context = this;
            hasEventElements.forEach(function (hasEventElement) {
                hasEventElement.addEventListener('click', function (e) {
                    var eventName = e.target.dataset['event'];
                    context[eventName](e);
                });
            });

            return this.el;
        }

    };

    return Base;
});
