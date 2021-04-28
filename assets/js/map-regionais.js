//mapa regionais
(function (window, document) {
    'use strict';

    var regionalMap = (function () {

        var $private = {};
        var $public = {};
        var map, infobox;

        $public.init = function() {

            $(window).on('load', function() {
                var divMap = $('#map-regional');

                if (divMap.length > 0) {
                    $private.create();
                }
            });              
        }; 

        $private.create = function() {
            map = new Microsoft.Maps.Map('#map-regional', {});
            map.setView({
                center: new Microsoft.Maps.Location('-22.148515964813974', '-48.03455506341975'),
                zoom: 7
            });

            //Create an infobox at the center of the map but don't show it.
            infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
                visible: false
            });

            //Assign the infobox to a map instance.
            infobox.setMap(map);

            //aqui tem que pegar os pins da regional
            var randomLocations = Microsoft.Maps.TestDataGenerator.getLocations(5, map.getBounds());

            for (var i = 0; i < randomLocations.length; i++) {
                var pin = new Microsoft.Maps.Pushpin(randomLocations[i], {
                    color: 'red'
                });

                //Store some metadata with the pushpin.
                pin.metadata = {
                    title: 'Pin ' + i,
                    description: 'Discription for pin' + i
                };

                //Add a click event handler to the pushpin.
                Microsoft.Maps.Events.addHandler(pin, 'click', function(e) {
                    //Make sure the infobox has metadata to display.
                    if (e.target.metadata) {
                        //Set the infobox options with the metadata of the pushpin.
                        infobox.setOptions({
                            location: e.target.getLocation(),
                            title: e.target.metadata.title,
                            description: e.target.metadata.description,
                            visible: true
                        });
                    }
                });

                //Add pushpin to the map.
                map.entities.push(pin);
            }
        };

        return $public;
    })();

    // Global
    window.regionalMap = regionalMap;
    regionalMap.init();
})(window, document);