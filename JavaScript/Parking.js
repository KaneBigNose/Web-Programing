const jsonFilePath = 'Json/parking.json';
const box99 = document.querySelector('.box2');

var markerImage1 = new kakao.maps.MarkerImage(
    parkingMarkerImage,
    new kakao.maps.Size(70, 70),
    {
        offset: new kakao.maps.Point(15, 30)
    }
);

function getOperationStatus(pkTime1, pkTime2, pkTime3) {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    function parseTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    let startTime, endTime;
    if (currentDay >= 1 && currentDay <= 5) {
        startTime = parseTime(pkTime1.split(' ~ ')[0]);
        endTime = parseTime(pkTime1.split(' ~ ')[1]);
    } else if (currentDay === 6) {
        startTime = parseTime(pkTime2.split(' ~ ')[0]);
        endTime = parseTime(pkTime2.split(' ~ ')[1]);
    } else {
        startTime = parseTime(pkTime3.split(' ~ ')[0]);
        endTime = parseTime(pkTime3.split(' ~ ')[1]);
    }

    if (endTime < startTime) {
        endTime += 24 * 60;
        if (currentTime < startTime) {
            currentTime += 24 * 60;
        }
    }

    if (currentTime >= startTime && currentTime <= endTime) {
        return "운영중";
    } 
    else if (currentTime > endTime) {
        return "운영종료"
    }
    else {
        return "알 수 없음";
    }
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