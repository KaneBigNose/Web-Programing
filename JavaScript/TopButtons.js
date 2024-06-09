function openWindowAndDisableButton() {
    var button = document.getElementById('navBtn');
    button.disabled = true;

    var newWindow = window.open('https://map.kakao.com/link/to/35.13457,129.1031', '_blank');

    var checkWindowClosed = setInterval(function () {
        if (newWindow.closed) {
            clearInterval(checkWindowClosed);
            button.disabled = false;
        }
    }, 1000);
}

function toggleButtons() {
    var buttons = ['illegalBtn', 'parkingBtn', 'clearBtn'];
    buttons.forEach(id => {
        var btn = document.getElementById(id);
        btn.style.display = (btn.style.display === 'none') ? 'inline-block' : 'none';
    });
}

function toggleButtonGroup() {
    var divElement = document.getElementById('btnContainer');
    if (divElement.style.display === 'none') {
        divElement.style.display = 'flex';
    } else {
        divElement.style.display = 'none';
    }
}

document.getElementById('illegalBtn').addEventListener('click', () => {
    clearMarkers();
    addIllegalBoxes();
    document.getElementById('illegalBtn').disabled = true;
    document.getElementById('parkingBtn').disabled = true;
    document.getElementById('clearBtn').disabled = false;
});

document.getElementById('parkingBtn').addEventListener('click', () => {
    clearMarkers();
    toggleParking();
    document.getElementById('illegalBtn').disabled = true;
});