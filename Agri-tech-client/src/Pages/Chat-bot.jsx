import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMessageCircle, FiMic } from "react-icons/fi";

const responses = {
  "stubble burning": "Stubble burning causes severe air pollution. Instead, farmers can sell stubble for biofuel or composting. Our platform connects farmers with industries that need stubble.",
  "alternatives to stubble burning": "Instead of burning, stubble can be used for biochar, paper production, and even organic fertilizers. Would you like to know how to sell it?",
  "how to sell stubble": "You can list your stubble on our platform. Nearby industries needing stubble for biomass fuel or manufacturing will contact you.",
  "entrepreneurial mindset": "A farmer can become an entrepreneur by exploring new revenue streams like organic farming, agri-tourism, and stubble recycling. Would you like tips?",
  "business ideas for farmers": "Farmers can start biofuel production, mushroom farming using stubble, or supply raw materials for packaging industries.",
  "government schemes": "Several government schemes provide subsidies for stubble collection and processing. Check PM-KUSUM and National Bio-Energy Mission.",
  "nearest industry for stubble": "Our AI system finds the nearest industries needing stubble. You can register and view the best buyers around you.",
  "biogas from stubble": "Yes! Stubble can be used to produce biogas, reducing waste and providing renewable energy.",
  "default": "I can answer questions about stubble burning solutions and farmer entrepreneurship. Try asking about stubble selling, alternatives, or business ideas!",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me about stubble burning or farmer entrepreneurship.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const matchedResponse = Object.keys(responses).find((key) =>
        userMessage.includes(key)
      );
      const botResponse = matchedResponse ? responses[matchedResponse] : responses["default"];
      
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      speak(botResponse);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg pt-40">
      <div className="flex items-center gap-2 mb-4">
        <FiMessageCircle className="text-green-600 text-3xl" />
        <h2 className="text-xl font-semibold text-green-700">Farmer Chatbot</h2>
      </div>
      
      <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl mb-2 w-fit max-w-xs ${
              msg.sender === "bot"
                ? "bg-green-100 text-green-900 self-start"
                : "bg-blue-100 text-blue-900 self-end"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {isTyping && <motion.div className="text-gray-500">Typing...</motion.div>}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about stubble solutions..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-green-600 text-white rounded-lg">
          <FiSend />
        </button>
        <button className="ml-2 p-2 bg-gray-200 text-gray-600 rounded-lg">
          <FiMic />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
