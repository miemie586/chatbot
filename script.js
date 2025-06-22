// script.js (snippet)
async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userInput = inputField.value.trim();

  if (!userInput) return;

  // Show user message
  chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  inputField.value = "";

  // Call the backend
  try {
    const response = await fetch("/.netlify/functions/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botReply = data.reply || "Sorry, I didn't get that.";

    // Show bot message
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;

  } catch (err) {
    chatbox.innerHTML += `<p><strong>Bot:</strong> Error: ${err.message}</p>`;
  }
}





