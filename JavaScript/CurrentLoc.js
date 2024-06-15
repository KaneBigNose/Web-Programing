//CurrentLoc.js

var mapContainer = document.getElementById('map'); // 지도를 표시할 div 요소
var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 지도의 중심 좌표
    level: 3 // 초기 지도의 확대 레벨 
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var marker = null; // 현재 마커를 가리키는 변수
var isFirstLoad = true; // 페이지가 처음 로드되었는지 여부를 나타내는 변수
var watchId = null;
var intervalId = null;



function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}


// HTML5의 geolocation을 지원하는지 확인합니다 
if (navigator.geolocation) {

    // GeoLocation을 이용해서 현재 위치를 가져옵니다
    navigator.geolocation.watchPosition(function (position) {

        var lat = position.coords.latitude; // 위도
        var lon = position.coords.longitude; // 경도
        locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 GeoLocation 좌표로 생성합니다

        // 페이지가 처음 로드된 경우에만 지도의 중심 좌표를 현재 위치로 설정합니다
        if (isFirstLoad) {
            map.setCenter(locPosition);
            isFirstLoad = false; // isFirstLoad 변수를 false로 설정하여 다음에는 이 코드가 실행되지 않도록 합니다
        }

        // 새로운 마커를 생성합니다
        if (marker) {
            marker.setMap(null); // 기존 마커가 있으면 지도에서 제거합니다
        }
        marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
    });

} else { // HTML5의 GeoLocation을 사용할 수 없을 때 마커 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667); // 기본 위치
    var message = 'Geolocation을 사용할 수 없습니다..'; // 인포윈도우에 표시될 내용

    // 새로운 마커를 생성합니다
    if (marker) {
        marker.setMap(null); // 기존 마커가 있으면 지도에서 제거합니다
    }
    marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: message,
        removable: true
    });

    // 인포윈도우를 마커 위에 표시합니다 
    infowindow.open(map, marker);
}


// '현재 위치' 버튼 클릭 시 현재 위치로 지도의 중심을 이동시키고 주기적으로 업데이트합니다
document.getElementById('currentLocationBtn').addEventListener('click', function() {
    // 이전에 설정된 인터벌이 있으면 해제합니다
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        return;
    }

    // 현재 위치로 지도의 중심을 설정하고 주기적으로 업데이트합니다
    if (locPosition) {
         // 부드러운 모션으로 지도의 중심을 현재 위치로 이동합니다
         map.panTo(locPosition, { duration: 1000 }); // 1초 동안 부드럽게 이동
         intervalId = setInterval(function() {
             if (locPosition) {
                 map.panTo(locPosition, { duration: 1000 }); // 1초마다 위치 업데이트
             }
         }, 1000); // 1초마다 위치 업데이트
    } else {
        alert('현재 위치를 불러올 수 없습니다.');
    }
});