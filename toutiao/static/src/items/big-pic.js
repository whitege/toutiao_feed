define('src/items/big-pic', function () {

    function BigPic() { }

    BigPic.prototype = {

        render: function () {
            var data = this.props.data;
            return `<div class="item big-pic">
                <div class="content">
                    <div y-on:click="clicking">
                        ${data.title}
                    </div>
                    <div class="big-img">
                        <img src="${data.imageList[0]}" />
                    </div>
                    <div class="itemInfo">
                        <span class="type">${data.itemInfo.type}</span>
                        <span>${data.itemInfo.type_origin}</span>
                        <span>评论 ${data.itemInfo.comment}</span>
                        <span>${data.itemInfo.time}<span>
                    </div>
                </div>
            </div>`;
        }
    }

    return BigPic

});