document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.querySelector("#disclaimer");
    setTimeout(() => {
        disclaimer.style.transform = "translateY(0)";
    }, 500);
    setTimeout(() => {
        disclaimer.style.transform = "translateY(-95px)";
    }, 5000);
})