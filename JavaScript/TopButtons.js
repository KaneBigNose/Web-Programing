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

function toggleSelect() {
    var selectContainer = document.querySelector('.box1 select');
    if (selectContainer) {
        selectContainer.remove();
    } else {
        var select = document.createElement('select');
        select.name = "filter";
        select.innerHTML = `
    <option value="1" selected>거리순</option>
    <option value="2">요금순</option>
    <option value="3">운영중</option>`;
        document.querySelector('.box1').appendChild(select);
    }
}

document.getElementById('navBtn').addEventListener('click', () => {
    document.getElementById('navBtn').disabled = true;
    document.getElementById('illegalBtn').style.display = 'none';
    document.getElementById('parkingBtn').style.display = 'none';
    document.getElementById('clearBtn').style.display = 'none';
});

document.getElementById('illegalBtn').addEventListener('click', () => {
    clearMarkers();
    addMarkersFromUrl(illegalUrl, 'illegal');
});

document.getElementById('parkingBtn').addEventListener('click', () => {
    clearMarkers();
    parkingUrls.forEach(url => addMarkersFromUrl(url, 'parking'));
    document.getElementById('parkingBtn').disabled = true;
    document.getElementById('clearBtn').disabled = false;
});

document.getElementById('clearBtn').addEventListener('click', () => {
    clearMarkers();
    document.getElementById('parkingBtn').disabled = false;
    document.getElementById('clearBtn').disabled = true;
});