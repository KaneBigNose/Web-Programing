function showPopup(index) {
    document.getElementById('overlay').classList.add('active');
    document.getElementById('popup' + index).classList.add('active');
}

function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.classList.remove('active'));
    document.getElementById('overlay').classList.remove('active');
}

function nextPopup(index) {
    closePopup();
    showPopup(index);
}

function prevPopup(index) {
    closePopup();
    showPopup(index);
}