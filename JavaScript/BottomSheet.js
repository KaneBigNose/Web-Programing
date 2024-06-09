const bottomSheet = document.getElementById('bottomSheet');
let startY = 0;
let currentY = 0;
let dragging = false;
let lastY = 0;
let lastTimestamp = 0;

bottomSheet.addEventListener('touchstart', (e) => {
    e.preventDefault(); // 기본 터치 이벤트를 막습니다.
    dragging = true;
    startY = e.touches[0].clientY - currentY; // 터치가 시작된 위치를 저장합니다.
    lastY = e.touches[0].clientY;
    lastTimestamp = e.timeStamp;
});

bottomSheet.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    currentY = e.touches[0].clientY - startY; // 현재 위치를 계산합니다.
    if (currentY < 0) currentY = 0; // 시트가 화면 위로 넘어가지 않도록 제한합니다.
    if (currentY > window.innerHeight - bottomSheet.clientHeight) 
        currentY = window.innerHeight - bottomSheet.clientHeight; // 시트가 화면 아래로 넘어가지 않도록 제한합니다.
    bottomSheet.style.transform = `translateY(${currentY}px)`; // 시트를 이동합니다.

    // 마지막 Y 위치와 타임스탬프를 업데이트합니다.
    lastY = e.touches[0].clientY;
    lastTimestamp = e.timeStamp;
});

bottomSheet.addEventListener('touchend', (e) => {
    dragging = false;

    // 속도를 계산합니다.
    const deltaY = e.changedTouches[0].clientY - lastY;
    const deltaTime = e.timeStamp - lastTimestamp;
    const velocity = deltaY / deltaTime;

    // 속도를 기반으로 최종 위치를 결정합니다.
    if (velocity > 0.5) {
        bottomSheet.style.transform = `translateY(${window.innerHeight - bottomSheet.clientHeight}px)`;
        currentY = window.innerHeight - bottomSheet.clientHeight;
    } else if (velocity < -0.5) {
        bottomSheet.style.transform = `translateY(0px)`;
        currentY = 0;
    } else {
        // 속도가 충분하지 않으면 현재 위치를 유지합니다.
        bottomSheet.style.transform = `translateY(${currentY}px)`;
    }
});

window.addEventListener('resize', () => {
    if (currentY > window.innerHeight - bottomSheet.clientHeight) {
        currentY = window.innerHeight - bottomSheet.clientHeight;
        bottomSheet.style.transform = `translateY(${currentY}px)`; // 시트 위치를 화면 크기에 맞게 조정합니다.
    }
});