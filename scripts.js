// scripts.js

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       LOGIN REDIRECT
    -------------------------------- */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const role = document.querySelector('input[name="role"]:checked').value;
            const username = document.getElementById("username").value;

            sessionStorage.setItem("currentUser", username);

            window.location.href = role === "admin" ? "admin.html" : "user.html";
        });
    }

    /* -------------------------------
       USERNAME DISPLAY
    -------------------------------- */
    const adminUsername = document.getElementById("adminUsername");
    const userUsername = document.getElementById("userUsername");

    if (adminUsername) {
        adminUsername.textContent = sessionStorage.getItem("currentUser") || "Admin";
    }

    if (userUsername) {
        userUsername.textContent = sessionStorage.getItem("currentUser") || "User";
    }

    /* -------------------------------
       LOGOUT
    -------------------------------- */
    const adminLogout = document.getElementById("adminLogout");
    const userLogout = document.getElementById("userLogout");

    [adminLogout, userLogout].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                sessionStorage.clear();
                window.location.href = "index.html";
            });
        }
    });

    /* -------------------------------
       SIDEBAR NAVIGATION
    -------------------------------- */
/* -------------------------------
   SIDEBAR NAVIGATION (ADMIN + USER)
-------------------------------- */
document.querySelectorAll(".sidebar").forEach(sidebar => {

    const buttons = sidebar.querySelectorAll(".sidebar-btn");
    const contentArea = sidebar.nextElementSibling;
    const sections = contentArea.querySelectorAll(".section");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            // activate button
            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            // hide all sections
            sections.forEach(sec => sec.classList.remove("active"));

            // USER DASHBOARD
            if (button.dataset.section.startsWith("user-")) {
                if (button.dataset.section === "user-notifications") {
                    document.getElementById("userNotificationsSection").classList.add("active");
                }
                if (button.dataset.section === "user-documents") {
                    document.getElementById("userDocumentsSection").classList.add("active");
                }
                if (button.dataset.section === "user-chat") {
                    document.getElementById("userChatSection").classList.add("active");
                }
            }

            // ADMIN DASHBOARD
            else {
                document
                    .getElementById(button.dataset.section + "Section")
                    .classList.add("active");
            }
        });
    });
});

    /* -------------------------------
       ADMIN DOCUMENT DRAG & DROP
    -------------------------------- */
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const docList = document.getElementById("docList");

    if (uploadArea && fileInput) {

        uploadArea.addEventListener("click", () => fileInput.click());

        uploadArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadArea.classList.add("drag-over");
        });

        uploadArea.addEventListener("dragleave", () => {
            uploadArea.classList.remove("drag-over");
        });

        uploadArea.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadArea.classList.remove("drag-over");
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener("change", () => {
            handleFiles(fileInput.files);
        });
    }

    function handleFiles(files) {
        [...files].forEach(file => {
            const item = document.createElement("div");
            item.className = "doc-item";
            item.innerHTML = `
                <div class="doc-icon">📄</div>
                <div class="doc-info">
                    <div class="doc-name">${file.name}</div>
                    <div class="doc-meta">${(file.size / 1024).toFixed(1)} KB</div>
                </div>
            `;
            docList.appendChild(item);
        });
    }

    /* -------------------------------
       USER EMPTY STATES
    -------------------------------- */
    const emptyMessage = (text) =>
        `<div style="padding:40px;text-align:center;color:#6b7280;font-weight:500;">${text}</div>`;

    const userNotifList = document.getElementById("userNotifList");
    const userDocList = document.getElementById("userDocList");
    const userChatMessages = document.getElementById("userChatMessages");

    if (userNotifList) userNotifList.innerHTML = emptyMessage("No new notifications");
    if (userDocList) userDocList.innerHTML = emptyMessage("No new uploads");
    if (userChatMessages) userChatMessages.innerHTML = emptyMessage("No new messages");
});
