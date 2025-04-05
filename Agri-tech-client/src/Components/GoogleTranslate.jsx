import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      // Hide Google logo after short delay
      setTimeout(() => {
        const googleLogo = document.querySelector(
          "#google_translate_element span.glogo"
        );
        if (googleLogo) googleLogo.style.display = "none";
      }, 1000);
    };

    addScript();
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-gray-300 hover:shadow-md transition duration-300">
      <img
        src="https://www.gstatic.com/images/branding/product/1x/translate_24dp.png"
        alt="Google Translate"
        className="w-5 h-5"
      />
      <span className="text-sm text-gray-800 font-medium">Translate</span>
      <div id="google_translate_element" className="ml-2" />
    </div>
  );
};

export default GoogleTranslate;
