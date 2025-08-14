const localStorage = window.localStorage;
document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.querySelector("#disclaimer");
    function showBanner() {
        setTimeout(() => {
            disclaimer.style.transform = "translateY(0)";
        }, 1000);
        setTimeout(() => {
            disclaimer.style.transform = "translateY(-95px)";
        }, 5000);
    }
    disclaimer.addEventListener("click", () => {
        disclaimer.style.transform = "translateY(-95px)";
    });
    if (!localStorage.getItem("disclaimerShown") || localStorage.getItem("disclaimerShown") !== "true") {
        showBanner();
        localStorage.setItem("disclaimerShown", "true");
    } else {
        disclaimer.style.display = "none";
    }
})