// why do we declare types?
//  - gives information to the programmer
//  - gives information to the compiler
//  - consistency
//  - validation


// 1. VARIABLE TYPE ANNOTATIONS
let i: number = 3;
// not allowed: i = "3"


// 2. UNION TYPES: allows more than one data type to be assigned
let j: number | string = 3;
j = 'foo';


// 3. FUNCTION TYPE ANNOTATIONS
function addNumbers(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
}

// anonymous function
function addNumbersTwo(firstNumber: number, f: (secondNumber: number) => number): number {
    return firstNumber + f(20);
}


// 4. CURRY FUNCTIONS
// adding type annotations to arrow curry functions
const addNumbersThreeArrow = (firstNumber: number) => (secondNumber: number): number => {
    return firstNumber + secondNumber;
}

// adding type annotations to regular js 
function addNumberThreeNormal(firstNumber: number) {
    // return type annotation only applicable on last function that returns a number
    return function(secondNumber: number): number {
        return firstNumber + secondNumber;
    }
}

function getNumbers(multiplyNumbers: (firstNumber: number, secondNumber: number) => number): (firstNumber: number) => (secondNumber: number) => number {
    return firstNumber => secondNumber => multiplyNumbers(firstNumber, secondNumber);   
}
// e.g. getNumbers(3)(4)


// 5. INTERFACES
// - using interface to annotate types in object data
interface Student {
    name: string,
    mark: number
}

// declaring object in variable
const student: Student = {name:"Tim", mark:51}

// using Readonly to make object immutable
const student2: Readonly<Student> = {name:"Tim", mark:51}


// 6. GENERIC TYPES
// must add generic parameters
interface GenericStudent<T> {
    id: T;
    name: string;
}

function curryTwo<U,V,W>(f: (x: U, y:V) => W): (x: U) => (y: V) => W {
    return x => y => f(x, y);
}


// 7. OPTIONAL PROPERTIES
// can be null
interface OptionalStudent<T> {
    id: T;
    name: string;
    next_student ?: OptionalStudent<T>;
}

// using typeof to test
const studentA: Readonly<OptionalStudent<2>> = { id: 2, name: "Student A"}
typeof studentA.next_student === 'undefined';


// 8. CHURCH ENCODING
// - encoding data using o nly lambda/anonymous functions
// e.g. getting head of Cons
const cons = (head, rest) => f => f(head, rest);    // returns f(head, rest) because that is the structure of a cons (whether head or rest)
const head = list => list((head, rest) => head);    // (head, rest) => rest will be consumed by f, since (head, rest) contains something
const rest = list => list((head, rest) => rest);    
const aList = cons("I", cons("love", cons("Typescript", null)));    // aList will contain reference to the first cons
head(rest(rest(aList)));