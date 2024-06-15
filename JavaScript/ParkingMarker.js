makeInfo(jsonFilePath);
function addMarkersFromJson(jsonFilePath) {
    document.getElementById('parkingBtn').disabled = true;
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {

                if (address && address.includes(',')) {
                    address = item.소재지도로명주소;
                }

                if (address != null) {

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

function getDistance(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function makeInfo(jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                var address = item.소재지지번주소;
                var name = item.주차장명;
                var pkNumber = item.전화번호;
                var pkTime1 = item.평일운영시작시각 + " ~ " + item.평일운영종료시각;
                var pkTime2 = item.토요일운영시작시각 + " ~ " + item.토요일운영종료시각;
                var pkTime3 = item.공휴일운영시작시각 + " ~ " + item.공휴일운영종료시각;
                var pkNeedMoney = item.요금정보;
                var pkBaseFee = item.주차기본요금;
                var pkDayFee = item.하루주차권요금;
                var pkMonthFee = item.월정기권요금;

                const infoBox = document.createElement('div');
                infoBox.className = 'inner-info';
                box99.appendChild(infoBox);

                const infoBox1 = document.createElement('div');
                infoBox1.className = 'inner-info1';
                infoBox.appendChild(infoBox1);

                const infoBox2 = document.createElement('div');
                infoBox2.className = 'inner-info2';
                infoBox.appendChild(infoBox2);

                const titleBox = document.createElement('div');
                titleBox.className = 'inner-title';
                titleBox.textContent = item.주차장명;
                infoBox1.appendChild(titleBox);

                const numberBox = document.createElement('div');
                geocoder.addressSearch(address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var lat = result[0].y;
                        var lng = result[0].x;
                        navigator.geolocation.watchPosition(function (position) {
                            var currentLat = position.coords.latitude;
                            var currentLng = position.coords.longitude;
                            let result = getDistance(currentLat, currentLng, lat, lng);
                            let distance = Math.round(result * 1000) / 1000;
                            numberBox.className = 'inner-number';
                            numberBox.textContent = `거리 : ${distance + 'km' || '계산할 수 없음'}`;
                            infoBox1.appendChild(numberBox);
                        });
                    }
                    else {
                        numberBox.className = 'inner-number';
                        numberBox.textContent = `거리 : 계산할 수 없음`;
                        infoBox1.appendChild(numberBox);
                    }
                });

                const isOpenBox = document.createElement('div');
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

                const timeBox = document.createElement('div');
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

                const payBox = document.createElement('div');
                payBox.className = 'inner-pay';
                if (pkNeedMoney == "유료") {
                    if (pkBaseFee != null) {
                        payBox.innerHTML = `기본요금 : ${pkBaseFee}원<br>`;
                    }
                    else {
                        payBox.innerHTML = `기본요금 : 정보없음<br>`;
                    }
                    if (pkDayFee != null) {
                        payBox.innerHTML += `하루요금 : ${pkDayFee}원<br>`;
                    }
                    else {
                        payBox.innerHTML += `하루요금 : 정보없음<br>`;
                    }
                    if (pkMonthFee != null) {
                        payBox.innerHTML += `월정기권 : ${pkMonthFee}원`;
                    }
                    else {
                        payBox.innerHTML += `월정기권 : 정보없음`;
                    }
                }
                else if (pkNeedMoney == "무료") {
                    payBox.textContent = `주차요금 : ` + pkNeedMoney;
                }
                else {
                    payBox.textContent = `주차요금 : 정보없음`;
                }
                infoBox2.appendChild(payBox);
            })
        })
}