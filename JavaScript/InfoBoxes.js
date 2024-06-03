function createBoxes() {
    var mapWidth = 700;

    var boxContainer = document.createElement('div');
    boxContainer.className = 'boxContainer';
    document.body.appendChild(boxContainer);

    var box1 = document.createElement('div');
    box1.className = 'box box1';
    boxContainer.appendChild(box1);

    var box2 = document.createElement('div');
    box2.className = 'box box2';
    boxContainer.appendChild(box2);
}

window.onload = function() {
    createBoxes();
};