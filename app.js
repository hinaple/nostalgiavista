const Alert = document.getElementById("alert");
const AlertBtn = document.getElementById("alertBtn");
const canvas = document.getElementById("canvas");
const container = document.getElementById("container");
const submit = document.getElementById("submit");
const noticeBtn = document.getElementById("noticeBtn");
const notice = document.getElementById("notice");
const closeNotice = document.getElementById("closeNotice");

setTimeout(() => {
    noticeBtn.classList.add("visible");
}, 10000);

noticeBtn.addEventListener("click", () => {
    noticeBtn.classList.remove("visible");
    notice.classList.add("visible");
});
closeNotice.addEventListener("click", () => {
    notice.classList.remove("visible");
});
function detectMobile(agent) {
    const mobileRegex = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];
    return mobileRegex.some((mobile) => agent.match(mobile));
}

const isMobile = detectMobile(window.navigator.userAgent);
if (isMobile) {
    alert("SORRY, BUT NOSTALGIA SUPPORTS ONLY PC BROWSERS.");
    document.body.innerHTML = "NTG SUPPORTS ONLY PC BROWSERS.";
}

submit.addEventListener("click", () => {
    if (!submitable) return;
    container.classList.add("res");
    submit.classList.remove("visible");
    drawable = false;
});

let showingAlert = true;
AlertBtn?.addEventListener("click", () => {
    if (!showingAlert) return;
    Alert?.classList.add("hide");
    showingAlert = false;
    drawable = true;
});

let submitable = false,
    drawable = false;
let cw, ch;
const cRect = canvas.getBoundingClientRect();
const Ratio = 2;
cw = cRect.width * Ratio;
ch = cRect.height * Ratio;

canvas.width = cw;
canvas.height = ch;
const ctx = canvas.getContext("2d");

let drawing = false;

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
let prvMouse = [];
canvas.addEventListener("mousedown", (evt) => {
    if (!drawable) return;
    if (!submitable) {
        submitable = true;
        submit.classList.add("visible");
    }
    drawing = true;
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";
    prvMouse = [evt.offsetX, evt.offsetY];
});
canvas.addEventListener("mousemove", (evt) => {
    if (!drawing) return;
    drawLine(
        prvMouse[0] * Ratio,
        prvMouse[1] * Ratio,
        evt.offsetX * Ratio,
        evt.offsetY * Ratio
    );
    prvMouse = [evt.offsetX, evt.offsetY];
});
document.body.addEventListener("mouseup", (evt) => {
    drawing = false;
});
