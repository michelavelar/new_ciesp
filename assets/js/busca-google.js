(function (window, document, $, undefined) {
    'use strict';

    var googleSearch = (function () {

        var $private = {};
        var $public = {};

        //inicia o processo de adicionar a busca do google na área de busca do site
        $public.init = function() {

            $(window).on('load', function(){
                var $searchElement = $('#google-search');

                if ($searchElement.length > 0) {
                    $private.googleCode($searchElement);

                    setTimeout(function() {
                        $private.googleScript();
                    }, 1000);
                }
            });         
        };

        $private.googleCode = function($element) {
            $element.html('<gcse:search></gcse:search>');
        };

        $private.googleScript = function() {
            var cx = '000366676399178729825:ouv7cxybknk';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        };
 
        return $public;
    })();

    // Global
    window.googleSearch = googleSearch;
    googleSearch.init();
})(window, document, jQuery);

