export class SortController {
  sortBy = "name";
  reverse = false;
  search = "";

  buttons = [];

  constructor(wrapper, sortingOptions) {
    this.wrapper = wrapper;
    this.sortingOptions = sortingOptions;
    console.log(sortingOptions);
    this.loadElements();
  }

  loadElements = () => {
    this.reverseCheckbox = this.wrapper.children[2];
    this.searchBar = this.wrapper.children[5];
    this.buttonWrap = this.wrapper.children[0];
    this.generateButtons();

    this.reverseCheckbox.addEventListener("change", () => {
      this.reverse = this.reverseCheckbox.component.checked;
      this.change && this.change(this.sortAttributes);
    });

    this.searchBar.addEventListener("change", () => {
      this.search = this.searchBar.component.value;
      this.change && this.change(this.sortAttributes);
    });
  };

  generateButtons = async () => {
    this.sortingOptions.forEach((value) => {
      let button = document.createElement("m-button");
      button.setAttribute("type", "outlined");
      button.addEventListener("click", () => {
        this.sortingOptionsButtonClick(value, button);
      });
      button.innerText = value;
      this.buttonWrap.appendChild(button);
      this.buttons.push({ button, option: value });
    });

    await uiBuilder.ready(this.buttons[0].button);
    this.buttons[0].button.click();
  };

  sortingOptionsButtonClick = (option, button) => {
    if (this.activeButton)
      this.activeButton.component.component.run.type("outlined");
    button.component.component.run.type("contained");
    this.activeButton = button;
    this.sortBy = option;
    this.change && this.change(this.sortAttributes);
  };

  get sortAttributes() {
    return [this.sortBy, this.reverse, this.search];
  }
}
