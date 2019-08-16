define('src/items/single-pic', function () {

    function SinglePic() {

    }

    SinglePic.prototype = {

        render: function () {
            var data = this.props.data;
            return `<div class="item single-pic">
                <div class="content">
                    <span y-on:click="clicking">
                        ${data.title}
                    </span>
                </div>
                <img src="${data.imageList[0]}" />
            </div>`;
        },

        clicking: function (e) {
            console.log('clickingclickingclickingclicking:', e);
        }

    };

    return SinglePic;

});
