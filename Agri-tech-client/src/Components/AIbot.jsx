import React, { useState } from "react";

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2020/02/25/05/18/bot-4877999_1280.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "150px",
          height: "150px",
        }}
      ></button>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 p-2 mt-2">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/0FRsNUg86ijNPYf4Xf5R1"
            width="100%"
            height="100%"
            frameBorder="0"
            title="AI Chatbot"
          />
        </div>
      )}
    </div>
  );
};

export default AIBot;

