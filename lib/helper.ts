export const loadScript = function (url: string) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = url;
    script.addEventListener("load", function () {
      resolve(true);
    });
    document.head.appendChild(script);
  });
};
