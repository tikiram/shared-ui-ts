import SimpleNavigation from "../../utils/SimpleNavigation.ts";

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
