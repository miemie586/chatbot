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





/*async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userInput = inputField.value.trim();
  const chatbox = document.getElementById("chatbox");

  if (!userInput) return;

  chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  inputField.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    chatbox.innerHTML += `<p><strong>MillaBot:</strong> ${botReply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;

  } catch (error) {
    console.error("Error:", error);
    chatbox.innerHTML += `<p><strong>MillaBot:</strong> Oops! Something went wrong.</p>`;
  }
}
*/