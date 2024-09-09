export interface SearchInitialResponse {
  _declaration: Declaration;
  items: Items;
}

export interface Declaration {
  _attributes: { version: string; encoding: string };
}

export interface Items {
  _attributes: { total: string; termsofuse: string };
  item: Item[];
}

export interface Item {
  _attributes: { type: string; id: string };
  name: Name;
  yearpublished: Yearpublished;
}

export interface Name {
  _attributes: { type: string; value: string };
}

export interface Yearpublished {
  _attributes: { value: string };
}
