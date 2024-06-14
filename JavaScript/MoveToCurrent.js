// 내 위치로 이동하는 함수
function moveToMyLocation() {
    // HTML5의 geolocation을 이용하여 현재 위치를 가져옵니다
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude; // 현재 위치의 위도
            var lng = position.coords.longitude; // 현재 위치의 경도

            // 가져온 위치로 지도의 중심을 이동시킵니다
            map.setCenter(new kakao.maps.LatLng(lat, lng));
        });
    } else {
        // geolocation을 지원하지 않는 경우 사용자에게 메시지를 표시할 수 있습니다
        alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
}
<button class="custom_button" onclick="moveToMyLocation()">내 위치로 이동</button>
