const chatWidget = document.getElementById("chatWidget");
const chatToggle = document.getElementById("chatToggle");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

chatToggle.addEventListener("click", () => {
  chatWidget.classList.add("open");
  chatInput.focus();
});

chatClose.addEventListener("click", () => {
  chatWidget.classList.remove("open");
});

function appendMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("chat-message", sender);
  message.innerText = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendOptions(options) {
  const container = document.createElement("div");
  container.classList.add("chat-options");
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "chat-option-button";
    btn.innerText = opt.label;
    btn.onclick = () => {
      appendMessage(opt.label, "user");
      chatBody.removeChild(container);
      setTimeout(() => {
        const reply = botReply(opt.label);
        appendMessage(reply, "bot");
      }, 500);
    };
    container.appendChild(btn);
  });
  chatBody.appendChild(container);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(userMsg) {
  const msg = userMsg.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    appendOptions([
      { label: "Book Categories" },
      { label: "Return Policy" },
      { label: "Price Range" }
    ]);
    return "Hi there! Choose an option below or type your question.";
  }

  if (msg.includes("bye") || msg.includes("goodbye")) {
    appendOptions([
      { label: "Book Categories" },
      { label: "Return Policy" },
      { label: "Price Range" }
    ]);
    return "Goodbye! If you have more questions, you can pick one below.";
  }

  if (msg.includes("book") || msg.includes("category")) {
    return "We have fiction, non-fiction, science, history, and more.";
  }

  if (msg.includes("return") || msg.includes("return policy")) {
    return "Books can be returned within 30 days with a receipt.";
  }

  if (msg.includes("price") || msg.includes("cost")) {
    return "Most books cost between $5 and $50.";
  }

  return "I'm not sure how to answer that. You can also reach us via the contact form above.";
}

chatSend.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  appendMessage(msg, "user");
  chatInput.value = "";
  setTimeout(() => {
    const reply = botReply(msg);
    appendMessage(reply, "bot");
  }, 600);
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") chatSend.click();
});

// FAQ accordion toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains("active");

    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
    });

    if (!isActive) {
      button.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Dark mode toggle
document.querySelector(".darkmode-toggle").addEventListener("click", () => {
  const htmlEl = document.documentElement;
  const isDark = htmlEl.getAttribute("data-theme") === "dark";
  htmlEl.setAttribute("data-theme", isDark ? "light" : "dark");
});
