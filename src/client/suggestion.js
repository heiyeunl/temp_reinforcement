const ingredients = ["sweet vermouth", "orange juice", "simple syrup", "lime juice", "lemon juice", "london dry gin", "vodka", "rum", "dry vermouth", "bourbon whiskey", "rye whiskey", "irish whiskey", "scotch whisky", "japanese whiskey", "whiskey", "whisky", "gin", "campari", "brandy", "cognac", "tequila", "sherry", "7-up", "tonic water", "soda water", "ginger beer", "pisco", "coke", "sake", "ginger ale", "irish cream", "chartreuse", "milk", "eggs", "cranberry jiuce", "triple sec", "beer", "mezcal", "champagne", "white wine", "red wine", "port wine", "sprite", "prosecco", "campari", "bitters", "lime wedge", "ice cube", "olive"];

class SuggestionTreeNode {
  constructor(value) {
    this.children = {};
    this.end = false;
    this.value = value;
  }
}

class SuggestionsTree extends SuggestionTreeNode {
  constructor() {
    super(null);
  }

  addWord(string) {
    const addWordHelper = (node, str) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new SuggestionTreeNode(str[0]);
        if (str.length === 1) {
          node.children[str[0]].end = true;
        }
      } else {
      }
      if (str.length > 1) {
        addWordHelper(node.children[str[0]], str.slice(1));
      }
    };
    addWordHelper(this, string);
  }

  predictWord(string) {
    var getRemainingTree = function(string, tree) {
      var node = tree;
      while (string) {
        node = node.children[string[0]];
        string = string.substr(1);
      }
      return node;
    };

    var allWords = [];
    
    var allWordsHelper = function(stringSoFar, tree) {
      for (let k in tree.children) {
        const child = tree.children[k]
        var newString = stringSoFar + child.value;
        if (child.end) {
          allWords.push(newString);
        }
        allWordsHelper(newString, child);
      }
    };

    var remainingTree = getRemainingTree(string, this);
    if (remainingTree) {
      allWordsHelper(string, remainingTree);
    }

    return allWords;
  }
}

const suggestions = new SuggestionsTree;
ingredients.forEach(el => suggestions.addWord(el));
// console.log(suggestions.predictWord('g'));
export default suggestions;

