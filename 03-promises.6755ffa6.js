!function(){function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=o.parcelRequire7bc7;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){t[e]=o},o.parcelRequire7bc7=i);var r=i("iU1Pc");var a={form:document.querySelector(".form"),submit:document.querySelector(".form button"),firstDelay:document.querySelector('input[name="delay"]'),delayStep:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]')};function u(e,o){return new Promise((function(n,t){setTimeout((function(){Math.random()>.3?n({position:e,delay:o}):t({position:e,delay:o})}),o)}))}window.addEventListener("load",(function(){e(r).Loading.arrows("Loading...",{clickToClose:!0,cssAnimationDuration:500,timeout:300}),r.Loading.remove(700)})),a.form.addEventListener("submit",(function(o){o.preventDefault();for(var n=+a.firstDelay.value,t=1;t<=a.amount.value;t++)u(t,n).then((function(o){var n=o.position,t=o.delay;e(r).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"),{clickToClose:!0,cssAnimationStyle:"zoom"})})).catch((function(o){var n=o.position,t=o.delay;e(r).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"),{clickToClose:!0,cssAnimationStyle:"zoom"})})),n+=+a.delayStep.value;o.currentTarget.reset()}))}();
//# sourceMappingURL=03-promises.6755ffa6.js.map