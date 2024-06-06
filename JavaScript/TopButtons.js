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

// document.getElementById('navBtn').addEventListener('click', () => {
//     document.getElementById('navBtn').disabled = true;
//     document.getElementById('illegalBtn').style.display = 'none';
//     document.getElementById('parkingBtn').style.display = 'none';
//     document.getElementById('clearBtn').style.display = 'none';
// });

document.getElementById('illegalBtn').addEventListener('click', () => {
    clearMarkers();
    // addMarkersFromUrl(illegalUrl, 'illegal');
    addIllegalBoxes();
    document.getElementById('illegalBtn').disabled = true;
    document.getElementById('parkingBtn').disabled = true;
    document.getElementById('clearBtn').disabled = false;
});

document.getElementById('parkingBtn').addEventListener('click', () => {
    clearMarkers();
    toggleSelect();
    addMarkersFromJson(jsonFilePath);
    // parkingUrls.forEach(url => addMarkersFromUrl(url, 'parking'));
    addParkingBoxes();
    document.getElementById('illegalBtn').disabled = true;
    document.getElementById('parkingBtn').disabled = true;
    document.getElementById('clearBtn').disabled = false;
});

document.getElementById('clearBtn').addEventListener('click', () => {
    clearMarkers();
    clearBox2();
    document.getElementById('illegalBtn').disabled = false;
    document.getElementById('parkingBtn').disabled = false;
    document.getElementById('clearBtn').disabled = true;
});