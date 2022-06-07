export const generate = (options) => {
  options = {
    ...{
      type: "img",
      data: "",
      textSize: "normal",
      text: "Text",
      click: "redirect/",
    },
    ...options,
  };

  let card = document.createElement("m-card");
  card.setAttribute("wave", "true");

  let divWrap = document.createElement("div");
  card.appendChild(divWrap);
  divWrap.className = "postWrapper";

  let dataDisplay;
  switch (options.type) {
    case "img":
      dataDisplay = document.createElement("img");
      break;
    case "mp4":
      dataDisplay = document.createElement("video");
      dataDisplay.controls = true;
      dataDisplay.muted = true;
      dataDisplay.autoplay = true;
      dataDisplay.loop = true;
      break;
  }
  divWrap.appendChild(dataDisplay);

  dataDisplay.src = options.data;

  let text;
  let textWrap = document.createElement("m-text");
  divWrap.appendChild(textWrap);

  switch (options.textSize) {
    case "normal":
      text = textWrap;
      break;
    case "none":
      text = {};
  }

  text.innerText = options.text;

  card.addEventListener("click", () => {
    switch (options.click) {
      case "redirect":
        window.location.pathname += options.path;
        break;
    }
  });

  return card;
};
