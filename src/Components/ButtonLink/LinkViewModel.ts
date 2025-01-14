import SimpleNavigation from "../../Utils/SimpleNavigation";

class LinkViewModel {
  #navigation: SimpleNavigation;

  constructor(navigation: SimpleNavigation) {
    this.#navigation = navigation;
  }

  onClick = (url: string) => {
    this.#navigation.push(url);
  };
}

export default LinkViewModel;
