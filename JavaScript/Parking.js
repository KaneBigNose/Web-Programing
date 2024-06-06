const jsonFilePath = 'Json/parking.json';

var markerImage1 = new kakao.maps.MarkerImage(
    parkingMarkerImage,
    new kakao.maps.Size(70, 70),
    {
        offset: new kakao.maps.Point(15, 30)
    }
);

function addMarkersFromJson(jsonFilePath) {
    document.getElementById('parkingBtn').disabled = true;
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                var address = item.소재지지번주소;

                if (address && address.includes(',')) {
                    address = item.소재지도로명주소;
                }

                var name = item.주차장명;

                if (address && address.startsWith("부산")) {
                    console.log(`주소: ${address}, 이름: ${name}`);

                    geocoder.addressSearch(address, function (result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                                image: markerImage1
                            });
                            markers.push(marker);

                            var content = `<div>${name}</div>`;

                            var infoWindow = new kakao.maps.InfoWindow({
                                content: content
                            });

                            kakao.maps.event.addListener(marker, "click", mouseClickListener(map, marker, infoWindow));
                            kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));

                        } else {
                            console.error('Failed to search address:', address);
                            if (item.소재지도로명주소) {
                                geocoder.addressSearch(item.소재지도로명주소, function (result, status) {
                                    if (status === kakao.maps.services.Status.OK) {
                                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                                        var marker = new kakao.maps.Marker({
                                            map: map,
                                            position: coords,
                                            image: markerImage1
                                        });
                                        markers.push(marker);

                                        var content = `<div>${name}</div>`;

                                        var infoWindow = new kakao.maps.InfoWindow({
                                            content: content
                                        });

                                        kakao.maps.event.addListener(marker, "click", mouseClickListener(map, marker, infoWindow));
                                        kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));

                                    } else {
                                        console.error('Failed to search address with alternate address:', item.소재지도로명주소);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        })
        .finally(() => {
            document.getElementById('parkingBtn').disabled = false;
        });
}

function mouseClickListener(map, marker, infoWindow) {
    return function () {
        infoWindow.open(map, marker);
    };
}

function mouseOutListener(infoWindow) {
    return function () {
        infoWindow.close();
    };
}
