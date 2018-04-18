
ymaps.ready(init);

var map;

function init(){
    map = new ymaps.Map ("map", {
        center: [55.753215, 37.622504],
        zoom: 8,
        controls: []
    }),
        objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32
    });

    map.behaviors.disable('scrollZoom');
    map.behaviors.disable('multiTouch');

    map.controls.add(new ymaps.control.ZoomControl({options: { position: { left: 30, bottom: 250 }}}));

    var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
        '<a class="map-balloon-link" href="{{properties.link}}">{{ properties.name }}</a>'
    );

    objectManager.objects.options.set({
        iconLayout: 'default#image',
        iconImageHref: './images/icons/marker.svg',
        iconImageSize: [24, 35],
        balloonContentLayout: MyBalloonContentLayoutClass
    });

    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

    map.geoObjects.add(objectManager);

    $.ajax({
        url: "json/data.json"
    }).done(function(data) {
        objectManager.add(data);
    });
}

