!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.start.addEventListener("click",(function(t){var r=t.currentTarget,n=function(){return document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))};n(),e=setInterval((function(){n()}),1e3),r.setAttribute("disabled","")})),t.stop.addEventListener("click",(function(r){clearInterval(e),t.start.removeAttribute("disabled")}));var e=null}();
//# sourceMappingURL=01-color-switcher.45a15427.js.map