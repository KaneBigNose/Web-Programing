const box2 = document.querySelector('.box2');

document.getElementById('parkingBtn').onclick = function () {
    toggleSelect();
    addParkingBoxes();
};

function toggleSelect() {
    var selectContainer = document.querySelector('.box1 select');
    if (selectContainer) {
        selectContainer.remove();
    } else {
        var select = document.createElement('select');
        select.name = "filter";
        select.innerHTML = `
    <option value="1" selected>거리순</option>
    <option value="2">요금순</option>`;
        document.querySelector('.box1').appendChild(select);
    }
}

function addParkingBoxes() {
    clearBox2();
    for (let i = 0; i < 10; i++) {
        const newBox = document.createElement('div');
        newBox.className = 'inner-box';
        newBox.textContent = `주차장 정보 ${i + 1}`;
        box2.appendChild(newBox);
    }
}

function clearBox2() {
    while (box2.firstChild) {
        box2.removeChild(box2.firstChild);
    }
}