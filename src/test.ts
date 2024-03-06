// interface Person {
//   name: string;

//   age: number;

//   hi: (person: { name: string; age: number }) => boolean;
// }

// const MyName: Person['name'] = '张三'
// type BBBB = Person['age']

// const sayHi: Person['hi'] = ({name, age}) => {

// }

const obj: Record<string, number> = {
  name: 123,
  age: 12,
  asf: 111,
};

const obj2: Record<"name" | "age", number> = {
  name: 123,
  age: 123,
  // aaa: 111,
};

console.log(obj, obj2);
