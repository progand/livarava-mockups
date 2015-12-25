'use strict';

angular.module('myApp.text')
    .service('neuronParser', function () {
        this.parse = function (text) {
            var type = 'text',
                image = 'https://www.livarava.com/static/livarava/img/neurons/text.png';

            if (text.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
                type = 'image';
                image = text;
            } else if (text.match(/^http(s):\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$/) !== null) {
                var videoId = text.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoId != null && videoId[1]) {
                    type = 'video';
                    image = 'http://img.youtube.com/vi/' + videoId[1] + '/default.jpg';
                }
            } else if (text.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/) !== null) {
                type = 'link';
                image = 'https://www.livarava.com/static/livarava/img/neurons/link.png';
            }

            return {
                id: Date.now(),
                header: text,
                image: image,
                type: type,
                type_title: type
            };
        }
    });
