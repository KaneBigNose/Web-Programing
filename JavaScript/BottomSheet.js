const bottomSheet = document.getElementById('bottomSheet');
let startY = 0;
let currentY = 0;
let dragging = false;

bottomSheet.addEventListener('touchstart', (e) => {
    e.preventDefault(); // 기본 터치 이벤트를 막습니다.
    dragging = true;
    startY = e.touches[0].clientY - currentY; // 터치가 시작된 위치를 저장합니다.
});

bottomSheet.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    currentY = e.touches[0].clientY - startY;
    if (currentY < 0) currentY = 0; 
    if (currentY > window.innerHeight - bottomSheet.clientHeight) currentY = window.innerHeight - bottomSheet.clientHeight; 
    bottomSheet.style.transform = `translateY(${currentY}px)`;
});

bottomSheet.addEventListener('touchend', (e) => {
    dragging = false;
    const velocity = (e.changedTouches[0].clientY - startY) / e.timeStamp;
    if (velocity > 0.5) {
        bottomSheet.style.transform = `translateY(${window.innerHeight - bottomSheet.clientHeight}px)`;
        currentY = window.innerHeight - bottomSheet.clientHeight;
    } else if (velocity < -0.5) {
        bottomSheet.style.transform = `translateY(0px)`;
        currentY = 0;
    } else {
        if (currentY > window.innerHeight / 2) {
            bottomSheet.style.transform = `translateY(${window.innerHeight - bottomSheet.clientHeight}px)`;
            currentY = window.innerHeight - bottomSheet.clientHeight;
        } else {
            bottomSheet.style.transform = `translateY(0px)`;
            currentY = 0;
        }
    }
});

window.addEventListener('resize', () => {
    if (currentY > window.innerHeight - bottomSheet.clientHeight) {
        currentY = window.innerHeight - bottomSheet.clientHeight;
        bottomSheet.style.transform = `translateY(${currentY}px)`;
    }
});
