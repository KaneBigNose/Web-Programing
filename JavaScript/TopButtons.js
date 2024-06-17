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

//버튼 누름 효과
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('illegalBtn');
    const button2 = document.getElementById('parkingBtn');
    const button3=document.getElementById('currentLocationBtn');
    
    button.addEventListener('click', () => {
        button.classList.toggle('color');
      });
    button2.addEventListener('click', () => {
      button2.classList.toggle('color');
    });
    button3.addEventListener('click', () => {
        button3.classList.toggle('color');
      });
  });
