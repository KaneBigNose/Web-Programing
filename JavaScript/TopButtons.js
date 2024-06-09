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
    toggleillegal();
});

document.getElementById('parkingBtn').addEventListener('click', () => {
    toggleParking();
});

var illegalOnclick = false;

function toggleillegal() {
    if(illegalOnclick == false) {
        lines.forEach(drawPolyline);
        illegalOnclick = true;
    }
    else {
        deleteAllPolylines()
        illegalOnclick = false;
    }
}