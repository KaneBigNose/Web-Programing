const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const bottomSheet = document.getElementById('bottomSheet');

var prkOnclick = false;

function toggleSelect() {
    var selectContainer = document.querySelector('.box1 select');
    if (selectContainer) {
        selectContainer.remove();
    }
    else {
        var select = document.createElement('select');
        select.name = "filter";
        select.id = "select";
        select.innerHTML = `
            <option value="1" selected>거리순</option>
            <option value="2">요금순</option>`;
        document.querySelector('.box1').appendChild(select);

        select.addEventListener("touchstart", function(event) {
            event.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
        });
    }
}

function toggleParking() {
    if (prkOnclick == false) {
        addMarkersFromJson(jsonFilePath);
        addSubTitleBox2();
        toggleSelect();
        prkOnclick = true;
    }
    else {
        clearMarkers();
        clearBox2();
        prkOnclick = false;
    }
}

function clearBox2() {
    while (box1.firstChild) {
        box1.removeChild(box1.firstChild);
    }
    while (box2.firstChild) {
        box2.removeChild(box2.firstChild);
    }
}

function addSubTitleBox2() {
    const newBox = document.createElement('div');
    newBox.className = 'subtitle-box';
    newBox.textContent = `주차장 정보`;
    box1.appendChild(newBox);
}