JavaScript
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("album-card");
    
    // Corecție pentru activarea butoanelor
    var btns = document.getElementsByClassName("filter-btn");
    for (var j = 0; j < btns.length; j++) {
        btns[j].classList.remove("active-filter");
        // Dacă textul butonului corespunde selecției, îl activăm
        if (btns[j].getAttribute('onclick').includes(c)) {
            btns[j].classList.add("active-filter");
        }
    }
    // ... restul codului rămâne la fel