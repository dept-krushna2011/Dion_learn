// =============================
// Dion Learn Authentication
// auth.js
// =============================

document.addEventListener("DOMContentLoaded", function () {

    // -------------------------
    // THEME
    // -------------------------
    const themeBtn =
        document.getElementById("themeToggle") ||
        document.getElementById("themeToggle2");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        if (themeBtn) themeBtn.textContent = "☀️";
    }

    if (themeBtn) {
        themeBtn.onclick = function () {
            document.body.classList.toggle("light-mode");

            const light = document.body.classList.contains("light-mode");

            themeBtn.textContent = light ? "☀️" : "🌙";

            localStorage.setItem("theme", light ? "light" : "dark");
        };
    }

    // -------------------------
    // LOGIN
    // -------------------------
    const data =
        localStorage.getItem("dionUser") ||
        sessionStorage.getItem("dionUser");

    if (!data) return;

    let user;

    try {
        user = JSON.parse(data);
    } catch (e) {
        return;
    }

    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const navButtons = document.querySelector(".nav-buttons");

    if (!navButtons) return;

    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";

    // Prevent duplicate user info
    if (document.getElementById("dion-user-info")) return;

    const userInfo = document.createElement("div");

    userInfo.id = "dion-user-info";

    userInfo.style.display = "flex";
    userInfo.style.alignItems = "center";
    userInfo.style.gap = "12px";

    userInfo.innerHTML = `
        <span style="
            color:var(--text-main);
            font-weight:600;
            font-size:14px;
        ">
            👤 ${user.name.split(" ")[0]}
        </span>

        <button
            class="login-btn"
            id="logoutBtn"
            style="
                border-color:#ef4444;
                color:#ef4444;
            ">
            Logout
        </button>
    `;

    navButtons.appendChild(userInfo);

    document
        .getElementById("logoutBtn")
        .addEventListener("click", logoutUser);
});

// -------------------------
// LOGIN BUTTON
// -------------------------
function goToLogin(tab = "signin") {

    localStorage.setItem(
        "returnPage",
        window.location.href
    );

    window.location.href =
        "login.html?tab=" + tab;
}

// -------------------------
// LOGOUT
// -------------------------
function logoutUser() {

    localStorage.removeItem("dionUser");
    sessionStorage.removeItem("dionUser");

    location.reload();
}