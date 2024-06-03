const parkingUrls = [
    "https://apis.data.go.kr/6260000/BusanPblcPrkngInfoService/getPblcPrkngInfo?serviceKey=%2B9h%2BiNdRBhISq%2BfkcRcEXacYgP9rBOreEaMlS6GulIOg18rVyFYyqnJa4l8yBvHsHn860gZpbboSHpRtR5IFfw%3D%3D&numOfRows=250&pageNo=1&resultType=json",
    "https://apis.data.go.kr/6260000/BusanPblcPrkngInfoService/getPblcPrkngInfo?serviceKey=%2B9h%2BiNdRBhISq%2BfkcRcEXacYgP9rBOreEaMlS6GulIOg18rVyFYyqnJa4l8yBvHsHn860gZpbboSHpRtR5IFfw%3D%3D&numOfRows=250&pageNo=2&resultType=json",
    "https://apis.data.go.kr/6260000/BusanPblcPrkngInfoService/getPblcPrkngInfo?serviceKey=%2B9h%2BiNdRBhISq%2BfkcRcEXacYgP9rBOreEaMlS6GulIOg18rVyFYyqnJa4l8yBvHsHn860gZpbboSHpRtR5IFfw%3D%3D&numOfRows=44&pageNo=3&resultType=json"
];

var markerImage1 = new kakao.maps.MarkerImage(
    parkingMarkerImage,
    new kakao.maps.Size(70, 70),
    {
        offset: new kakao.maps.Point(15, 30) 
    }
);

function addMarkersFromUrl(url, type) {
    fetch(url)
        .then(res => res.json())
        .then(resJson => {
            var items = (type === 'illegal') ? resJson.getIlglWkstInfo.body.items.item : resJson.getPblcPrkngInfo.body.items.item;
            items.forEach(item => {
                var address = type === 'illegal' ? item.address : (item.doroAddr !== "-" ? item.doroAddr : item.jibunAddr);
                var name = type === 'illegal' ? "주정차 단속 위치" : item.pkNam;

                geocoder.addressSearch(address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                            image: markerImage1
                        });
                        markers.push(marker);

                        var content = '<div style="padding:5px;max-width:500px;overflow:auto;white-space:pre-wrap;word-wrap:break-word;">' + name + '</div>';

                        var infoWindow = new kakao.maps.InfoWindow({
                            content: content
                        });

                        kakao.maps.event.addListener(marker, "click", mouseClickListener(map, marker, infoWindow));
                        kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));
                    }
                });
            });
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