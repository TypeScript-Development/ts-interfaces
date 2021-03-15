// interface: describes the structure of an object
// interface just exists in TS
// unlike a class an interface is not a blueprint, is more like a custom type
/* An interface has no implementation details. Abstract classes can be a mixture overriding certain methods (E.g: abstract describe(this: Department): void) and implementing others (E.g: addEmployee(employee: string) {
    this.employees.push(employee);
})
*/

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  // readonly (modifier) available on interfaces. This property must only be set once and is read only there after cant be changed after the object has been initialized.
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(
        phrase +
          " " +
          this.name +
          " " +
          "and I'm" +
          " " +
          this.age +
          " years old"
      );
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable;
user1 = new Person();
// The above is valid because the Person class is based on the Greetable interface

user1.greet("Hi there I am");
console.log(user1);

/*
    Classes can only inherit from one class
    Interfaces can extend multiple interfaces
*/
