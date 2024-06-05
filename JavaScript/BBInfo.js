const box3 = document.querySelector('.box1');
const box4 = document.querySelector('.box2');

function addIllegalBoxes() {
    addSubTitleBox1();
    for (let i = 0; i < 10; i++) {
        const newBox = document.createElement('div');
        newBox.className = 'inner-box';
        newBox.textContent = `주정차 단속 정보 ${i + 1}`;
        box4.appendChild(newBox);
    }
}

function addSubTitleBox1() {
    const newBox = document.createElement('div');
    newBox.className = 'subtitle-box';
    newBox.textContent = `주정차 금지구역 정보`;
    box1.appendChild(newBox);
}