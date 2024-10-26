
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Tambahkan event listener ke tombol kirim
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        // Kirim pesan ke chat AI
        await sendMessage(userMessage);
        // Bersihkan input field
        userInput.value = '';
    }
});

// Fungsi untuk mengirim pesan ke chat AI
async function sendMessage(message) {
    // Buat item log chat baru untuk pesan pengguna
    const chatLogItem = document.createElement('li');
    chatLogItem.textContent = `Anda: ${message}`;
    chatLog.appendChild(chatLogItem);
    // Scroll ke bawah log chat
    chatLog.scrollTop = chatLog.scrollHeight;

    try {
        // Dapatkan respon dari chat AI
        const response = await getResponse(message);
        // Buat item log chat baru untuk respon AI
        const responseLogItem = document.createElement('li');
        responseLogItem.textContent = `AI: ${response.choices[0].message.content}`; // Ambil konten dari respons
        chatLog.appendChild(responseLogItem);
    } catch (error) {
        // Menangani error jika terjadi saat mendapatkan respons
        const errorLogItem = document.createElement('li');
        errorLogItem.textContent = `AI: Terjadi kesalahan - ${error.message}`;
        chatLog.appendChild(errorLogItem);
    }

    // Scroll ke bawah log chat
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Fungsi untuk mendapatkan respon dari chat AI menggunakan API
async function getResponse(message) {
    const apiKey = 's
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`, // Pastikan API key di sini benar
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Model yang ingin digunakan
            messages: [
                { role: 'user', content: message },
            ],
        }),
    });

    // Cek apakah respons tidak ok
    if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
    }

    // Mengambil data dari respons
    const data = await response.json();
    return data; // Mengembalikan data dari API
}











