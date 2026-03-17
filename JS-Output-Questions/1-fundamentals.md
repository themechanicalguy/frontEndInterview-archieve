# Find the Output of the following

## 1 Variable Concepts

```javascript
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3

let 1a; // cannot start with a digit
let my-name; // hyphens '-' aren't allowed in the name

let имя = '...'; // Non-Latin letters are allowed, but not recommended
let 我 = '...';
// Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names.

let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```

**Explaination:**
There are two limitations on variable names in JavaScript:

- The name must contain only letters, digits, or the symbols `$` and `_`.
- The first character must not be a digit.

* There is a list of reserved words, which cannot be used as variable names because they are used by the language itself. For example: `let`, `class`, `return`, and `function` are reserved.
