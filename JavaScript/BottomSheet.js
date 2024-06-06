const bottomsheetbox = document.querySelector('.box1');

bottomsheetbox.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    isDragging = true;
    box1.classList.add('dragging');
});

bottomsheetbox.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const translateY = Math.max(0, Math.min(250, 250 + (startY - currentY)));
    boxContainer.style.transform = `translateY(${translateY}px)`;
});

bottomsheetbox.addEventListener('touchend', function(e) {
    isDragging = false;

    box1.classList.remove('dragging');

    if (startY - currentY > 50) {
        boxContainer.classList.add('active');
    } else if (currentY - startY > 50) {
        boxContainer.classList.remove('active');
    } else {
        if (boxContainer.classList.contains('active')) {
            boxContainer.style.transform = 'translateY(0)';
        } else {
            boxContainer.style.transform = 'translateY(250px)';
        }
    }
});