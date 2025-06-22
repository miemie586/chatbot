const fetch = require("node-fetch");

exports.handler = async (event) => {
  console.log("✅ Netlify Function is running...");
  console.log("🔑 OPENAI_KEY:", process.env.OPENAI_KEY); // To check if your key is loaded

  // Step 1: Parse user message
  let message;
  try {
    const body = JSON.parse(event.body || "{}");
    message = body.message;
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON in request body." })
    };
  }

  if (!message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No message provided." })
    };
  }

  // Step 2: Send to OpenAI
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    // Step 3: Get raw response text and try parsing
    const text = await res.text();
    console.log("📦 Raw OpenAI response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to parse OpenAI response." })
      };
    }

    // Step 4: Extract reply
    const reply = data.choices?.[0]?.message?.content || "Sorry, no reply.";
    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    console.error("🔥 Server error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error: ${err.message}` })
    };
  }
};
