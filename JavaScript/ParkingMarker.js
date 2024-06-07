function addMarkersFromJson(jsonFilePath) {
    document.getElementById('parkingBtn').disabled = true;
    addSubTitleBox2();
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

                var infoBox = document.createElement('div');
                infoBox.className = 'inner-info';
                box99.appendChild(infoBox);

                var titleBox = document.createElement('div');
                titleBox.className = 'inner-title';
                titleBox.textContent = name;
                infoBox.appendChild(titleBox);

                var numberBox = document.createElement('div');
                numberBox.className = 'inner-number';
                if (pkNumber != null) {
                    numberBox.textContent = `전화번호 : ` + pkNumber;
                }
                else {
                    numberBox.textContent = `전화번호 : 없음`;
                }
                infoBox.appendChild(numberBox);

                var isOpenBox = document.createElement('div');
                isOpenBox.textContent = getOperationStatus(pkTime1, pkTime2, pkTime3);
                if (isOpenBox.textContent == "운영중") {
                    isOpenBox.className = 'inner-isOpen';
                }
                else {
                    isOpenBox.className = 'inner-isClose';
                }
                infoBox.appendChild(isOpenBox);

                var timeBox = document.createElement('div');
                timeBox.className = 'inner-time';
                timeBox.innerHTML = `평일 (${pkTime1})<br>`;
                timeBox.innerHTML += `토요일 (${pkTime2})<br>`;
                timeBox.innerHTML += `공휴일 (${pkTime3})`;
                infoBox.appendChild(timeBox);

                var payBox = document.createElement('div');
                payBox.className = 'inner-pay';
                if (pkNeedMoney == "유료") {
                    if(pkBaseFee != null) {
                        payBox.innerHTML = `기본요금 : ${pkBaseFee}원<br>`;
                    }
                    else {
                        payBox.innerHTML = `기본요금 : 정보없음<br>`;
                    }
                    if(pkDayFee != null) {
                        payBox.innerHTML += `하루요금 : ${pkDayFee}원<br>`;
                    }
                    else {
                        payBox.innerHTML += `하루요금 : 정보없음<br>`;
                    }
                    if(pkMonthFee != null) {
                        payBox.innerHTML += `월정기권 : ${pkMonthFee}원`;
                    }
                    else {
                        payBox.innerHTML += `월정기권 : 정보없음`;
                    }
                }
                else {
                    payBox.textContent = `주차요금 : ` + pkNeedMoney;
                }
                infoBox.appendChild(payBox);

                if (address && address.includes(',')) {
                    address = item.소재지도로명주소;
                }

                if (address && address.startsWith("부산")) {

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