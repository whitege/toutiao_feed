define('src/items/multiple-pic', function () {

    function MultiplePic() {

    }

    MultiplePic.prototype = {

        render: function () {

            var data = this.props.data;

            var imageList = data.imageList.map(image => {
                    return `<img src=${image} />`;
                }).join('');

            return `<div class="item multiple-image" on:click="aa">
                <h3>
                    ${data.title}
                </h3>
                <div class="image-list">
                    ${imageList}
                </div>
            </div>`;
        }

    };

    return MultiplePic;
});
