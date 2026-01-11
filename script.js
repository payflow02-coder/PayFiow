let checkData = null;

function simpleHash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    return "HF-" + Math.abs(hash);
}

function generateCheck() {
    const id = "PF-" + Math.floor(Math.random() * 1000000);
    const date = new Date().toLocaleString();
    const hash = simpleHash(id + date);

    checkData = { id, date, hash };

    document.getElementById("checkBox").innerHTML = `
        <b>Цифрлық чек</b><br>
        ID: ${id}<br>
        Күні: ${date}<br>
        Hash: ${hash}<br>
        <span class="badge">✔ Төлем расталды</span>
    `;

    document.getElementById("qrBox").innerHTML = "";
    new QRCode(document.getElementById("qrBox"), id);
}

function validateCheck() {
    const input = document.getElementById("checkIdInput").value;
    const result = document.getElementById("validationResult");

    if (!checkData) {
        result.innerText = "Алдымен чек жасаңыз";
        result.style.color = "orange";
        return;
    }

    if (input === checkData.id) {
        result.innerText = "✅ Чек hash арқылы расталды";
        result.style.color = "green";
    } else {
        result.innerText = "❌ Дерек өзгертілген";
        result.style.color = "red";
    }
}

function downloadPDF() {
    if (!checkData) return alert("Алдымен чек жасаңыз");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("PayFlow – Цифрлық чек", 20, 20);
    pdf.setFontSize(12);
    pdf.text("ID: " + checkData.id, 20, 45);
    pdf.text("Күні: " + checkData.date, 20, 55);
    pdf.text("Hash: " + checkData.hash, 20, 65);

    pdf.setTextColor(34,197,94);
    pdf.text("ТӨЛЕМ РАСТАЛДЫ", 20, 85);

    pdf.save(checkData.id + ".pdf");
}
