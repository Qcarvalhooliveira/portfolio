# React + TypeScript + Vite

```
function createUniqueIdGenerator() {
  let id = 0; // Private variable, inaccessible from outside createUniqueIdGenerator
  return {
    getNextId: function() {
      id += 1;   // Increments the private variable 'id'
      return id;  // Returns the new value of 'id'
    }
  };
}

// Using the function
const uniqueIdGenerator = createUniqueIdGenerator();
console.log(uniqueIdGenerator.getNextId()); // 1
console.log(uniqueIdGenerator.getNextId()); // 2
console.log(uniqueIdGenerator.getNextId()); // 3

```