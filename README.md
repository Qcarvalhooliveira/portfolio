# React + TypeScript + Vite

```
function get_add(x) {
  return function(y) {
    return x + y;
  };
}

let addFive = get_add(5);
console.log(addFive(2));
// Outputs: 7
```