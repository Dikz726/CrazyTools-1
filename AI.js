const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Fungsi utama buat nambahin bubble pesan ke chatbox
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-cyber', sender === 'user' ? 'user-msg' : 'ai-msg');
    
    // Pilih icon berdasarkan pengirim
    const iconClass = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    // Masukin HTML konten pesan
    messageDiv.innerHTML = `
        <i class="${iconClass} icon-msg"></i>
        <div class="message-text">${text}</div>
    `;
    
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll paling bawah setiap ada pesan baru
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi handle tombol 'Enter'
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Fungsi tombol 'Kirim' diklik
async function sendMessage() {
    const messageText = userInput.value.trim();
    
    // Jangan kirim kalau input kosong
    if (messageText === '') return;

    // 1. Tampilkan pesan Flutter (User)
    appendMessage(messageText, 'user');
    userInput.value = ''; // Kosongkan input

    try {
        // --- TEMPAT INTEGRASI API AI ASLIMU ---
        // (Misal pakai fetch ke backend)
        // -------------------------------------

        // 2. Simulasi balasan santai dari Zelta (AI)
        setTimeout(() => {
            // Contoh balasan yang gak kaku
            const zeltaReplies = [
                "Wih, mantap abis ketikan kamu, Flutter! Gak berantakan lagi kan tampilannya? 😎",
                "Oke siap, Flutter! Zelta dengerin kok. Lanjuttt!",
                "Hehehe, tampilan baru chat kita emang paling *slebew* deh! Kamu suka gak?",
                "Gimana, Flutter? Udah rapi, responsif, dan *cyber* banget kan sekarang? Gak pusing lagi liatnya!"
            ];
            // Pilih balasan acak biar seru
            const randomReply = zeltaReplies[Math.floor(Math.random() * zeltaReplies.length)];
            appendMessage(randomReply, 'ai');
        }, 1200); // Delay dikit biar natural

    } catch (error) {
        console.error("Waduh, error nih:", error);
        appendMessage("Aduh Flutter, sori banget... Koneksi Zelta lagi agak 'ngadat' nih. Coba lagi bentar ya!", 'ai');
    }
}