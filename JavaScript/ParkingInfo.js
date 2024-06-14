const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");

var prkOnclick = false;

function toggleParking() {
  if (prkOnclick == false) {
    addMarkersFromJson(jsonFilePath);
    prkOnclick = true;
  } else {
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