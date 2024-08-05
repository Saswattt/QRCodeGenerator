const qrInput = document.querySelector(".data"),
    qrImg = document.querySelector("#img"),
    generateBtn = document.querySelector(".submit");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if (!qrValue) return;
    generateBtn.innerText = "Generating QR Code...";
    generateBtn.classList.add("inactive");

    // Generate the QR code
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.classList.remove("hidden");

    qrImg.addEventListener("load", () => {
        generateBtn.classList.remove("inactive");
        generateBtn.innerText = "Generate QR Code";
    });

    qrImg.addEventListener("error", () => {
        alert("Failed to generate QR code. Please try again.");
        generateBtn.classList.remove("inactive");
        generateBtn.innerText = "Generate QR Code";
    });
});

// Debounce function to prevent rapid firing of keyup event
const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    }
};

qrInput.addEventListener("keyup", debounce(() => {
    if (!qrInput.value) {
        generateBtn.classList.remove("inactive");
    }
}, 300));
