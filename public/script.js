import * as htmlToImage from "./html-to-image/lib/index.js";

htmlToImage
  .toJpeg(document.getElementById("certificate"), { quality: 0.95 })
  .then((dataUrl) => {
    const parent = document.body;
    const link = document.createElement("a");
    link.innerText = dataUrl;
    link.href = dataUrl;
    parent.appendChild(link);
  });
