var saveAdress = [];

makeInfo(jsonFilePath);

function addMarkersFromJson(jsonFilePath) {
    document.getElementById('parkingBtn').disabled = true;
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                let address = item.소재지지번주소 || item.소재지도로명주소;
                let name = item.주차장명;

                if (address) {
                    geocodeAddressAndAddMarker(address, name);
                }
            });
        })
        .catch(error => console.error('Error loading JSON file:', error))
        .finally(() => document.getElementById('parkingBtn').disabled = false);
}

function geocodeAddressAndAddMarker(address, name) {
    geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            addMarker(coords, name);
        } else {
            console.error('Failed to search address:', address);
        }
    });
}

function addMarker(coords, name) {
    let marker = new kakao.maps.Marker({
        map: map,
        position: coords,
        image: markerImage1
    });
    markers.push(marker);

    let content = `<div>${name}</div>`;
    let infoWindow = new kakao.maps.InfoWindow({ content: content });

    kakao.maps.event.addListener(marker, "click", mouseClickListener(map, marker, infoWindow));
    kakao.maps.event.addListener(marker, "mouseout", mouseOutListener(infoWindow));
}

function getDistance(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) { return deg * (Math.PI / 180); }
    let R = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lng2 - lng1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function makeInfo(jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                let address = item.소재지지번주소 || item.소재지도로명주소;
                if (address) {
                    geocodeAddressAndDisplayInfo(address, item, index);
                }
            });
        });
}

function geocodeAddressAndDisplayInfo(address, item, index) {
    geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            let coords = { lat: result[0].y, lng: result[0].x };
            saveAdress[index] = coords;

            let infoBox = createInfoBox(item, coords);
            box99.appendChild(infoBox);
        } else {
            console.error('Failed to search address:', address);
        }
    });
}

function createInfoBox(item, coords) {
    let infoBox = document.createElement('div');
    infoBox.className = 'inner-info';

    let button = document.createElement('button');
    button.className = 'inner-pkbutton';
    infoBox.appendChild(button);

    button.addEventListener("click", function () {
        let moveLatLon = new kakao.maps.LatLng(coords.lat, coords.lng);
        map.panTo(moveLatLon);
    });

    let infoBox1 = document.createElement('div');
    infoBox1.className = 'inner-info1';
    button.appendChild(infoBox1);

    let infoBox2 = document.createElement('div');
    infoBox2.className = 'inner-info2';
    button.appendChild(infoBox2);

    let titleBox = document.createElement('div');
    titleBox.className = 'inner-title';
    titleBox.textContent = item.주차장명;
    infoBox1.appendChild(titleBox);

    let distanceBox = document.createElement('div');
    navigator.geolocation.watchPosition(function (position) {
        let currentLat = position.coords.latitude;
        let currentLng = position.coords.longitude;
        let distance = getDistance(currentLat, currentLng, coords.lat, coords.lng);
        distanceBox.className = 'inner-number';
        distanceBox.textContent = `거리: ${distance.toFixed(3)}km`;
        infoBox1.appendChild(distanceBox);
    });

    let isOpenBox = document.createElement('div');
    isOpenBox.textContent = getOperationStatus(
        `${item.평일운영시작시각} ~ ${item.평일운영종료시각}`,
        `${item.토요일운영시작시각} ~ ${item.토요일운영종료시각}`,
        `${item.공휴일운영시작시각} ~ ${item.공휴일운영종료시각}`
    );
    if (isOpenBox.textContent === "운영중") {
        isOpenBox.className = 'inner-isOpen';
    }
    else if (isOpenBox.textContent === "주거지 주차장") {
        isOpenBox.className = 'inner-isNot';
    }
    else {
        isOpenBox.className = 'inner-isClose';
    }
    infoBox2.appendChild(isOpenBox);

    let timeBox = document.createElement('div');
    timeBox.className = 'inner-time';
    if (item.평일운영시작시각 == null) {
        timeBox.textContent = "시간 정보 없음"
    }
    else {
        timeBox.innerHTML = `
                                평일 (${item.평일운영시작시각} ~ ${item.평일운영종료시각})<br>
                                토요일 (${item.토요일운영시작시각} ~ ${item.토요일운영종료시각})<br>
                                공휴일 (${item.공휴일운영시작시각} ~ ${item.공휴일운영종료시각})
                            `;
    }
    infoBox2.appendChild(timeBox);

    let payBox = document.createElement('div');
    payBox.className = 'inner-pay';
    payBox.innerHTML = item.요금정보 === "유료" ?
        `기본요금: ${item.주차기본요금 ? `${item.주차기본요금}원` : '정보없음'}<br>
         하루요금: ${item.하루주차권요금 ? `${item.하루주차권요금}원` : '정보없음'}<br>
         월정기권: ${item.월정기권요금 ? `${item.월정기권요금}원` : '정보없음'}`:
        `주차요금: ${item.요금정보 || '정보없음'}`;
    infoBox2.appendChild(payBox);

    // 길 안내 버튼 추가
    let navButton = document.createElement('button');
    navButton.textContent = '길 안내';
    navButton.addEventListener("click", function () {
        startNavigation(item.주차장명, coords.lng, coords.lat);
    });
    infoBox2.appendChild(navButton);


    return infoBox;
}
function startNavigation(name, x, y) {
    alert(`Name: ${name}, X: ${x}, Y: ${y}`);
    Kakao.Navi.start({
        name: name,
        x: x,
        y: y,
        coordType: 'katec',
        //coordType: 'wgs84',
    });
}