/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * TypeScript vs C# - A Comparison Guide
 *
 * TypeScript is a statically typed superset of JavaScript with features similar to C#.
 * Both support: interfaces, classes, generics, enums, async/await, and strong typing.
 */

// Make this file a module to avoid global scope conflicts
export {};

// BASIC TYPES
// C#: int, string, bool, etc.
// TS: number, string, boolean (all lowercase)

const name = "Alice";
const age = 25;
const isActive = true;

// Type inference works like C# var
const inferredName = "Bob"; // TypeScript infers string
const inferredAge = 30; // TypeScript infers number

// ARRAYS
// C#: string[] names = new string[] { "Alice", "Bob" };
// TS: Similar syntax
const names: string[] = ["Alice", "Bob", "Charlie"];
const numbers: number[] = [1, 2, 3, 4, 5];

// INTERFACES
// Similar to C# interfaces, define object shapes
interface User {
	id: number;
	name: string;
	email: string;
	age?: number; // Optional property (C# equivalent: int? age)
	readonly createdAt: Date; // Like C# readonly
}

const user: User = {
	id: 1,
	name: "Alice",
	email: "alice@example.com",
	createdAt: new Date(),
};

// Interface inheritance (same as C#)
interface Admin extends User {
	role: string;
	permissions: string[];
}

// TYPE ALIASES
// Similar to C# using aliases or record types
type ID = string | number; // Union type (no direct C# equivalent)
type Status = "pending" | "approved" | "rejected"; // String literal union

// UNION TYPES
// TypeScript feature - a value can be one of several types
// C# closest equivalent: object or dynamic (but less type-safe)
function printId(id: string | number): void {
	if (typeof id === "string") {
		console.log(`String ID: ${id.toUpperCase()}`);
	} else {
		console.log(`Number ID: ${id}`);
	}
}

printId("ABC123"); // Works with string
printId(456); // Works with number

// GENERICS
// Same concept as C# generics
function identity<T>(value: T): T {
	return value;
}

const result1 = identity<string>("hello");
const result2 = identity<number>(42);

// Generic interface (like C# IEnumerable<T>, List<T>)
interface Box<T> {
	value: T;
	getValue(): T;
}

const stringBox: Box<string> = {
	value: "Hello",
	getValue: () => "Hello",
};

// Generic constraints (like C# where T : IComparable)
interface HasLength {
	length: number;
}

function logLength<T extends HasLength>(item: T): T {
	console.log(`Length: ${item.length}`);
	return item;
}

// FUNCTIONS
// TypeScript functions are more flexible than C# methods

// Standard function
function add(a: number, b: number): number {
	return a + b;
}

// Optional parameters (C#: default parameters)
function greet(name: string, greeting?: string): string {
	return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameters (same as C#)
function multiply(a: number, b = 1): number {
	return a * b;
}

// Rest parameters (C# params keyword)
function sum(...numbers: number[]): number {
	return numbers.reduce((total, n) => total + n, 0);
}

// Arrow functions (C# lambda expressions)
const square = (n: number): number => n * n;
const divide = (a: number, b: number): number => a / b;

// CLASSES
// Very similar to C# classes
class Person {
	private readonly id: number; // C# private readonly
	protected name: string; // C# protected
	public age: number; // C# public
	readonly birthDate: Date; // C# readonly

	constructor(id: number, name: string, age: number, birthDate: Date) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.birthDate = birthDate;
	}

	public introduce(): string {
		return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
	}

	// Getters and setters (same as C# properties)
	public get displayName(): string {
		return this.name.toUpperCase();
	}

	public set displayName(value: string) {
		this.name = value;
	}

	// Static methods (same as C#)
	public static createGuest(): Person {
		return new Person(0, "Guest", 0, new Date());
	}
}

// Inheritance (same as C#)
class Employee extends Person {
	constructor(
		id: number,
		name: string,
		age: number,
		birthDate: Date,
		public salary: number
	) {
		super(id, name, age, birthDate);
	}

	public override introduce(): string {
		return `${super.introduce()} I work here.`;
	}
}

// ENUMS
// Similar to C# enums
enum Direction {
	Up = 1,
	Down = 2,
	Left = 3,
	Right = 4,
}

enum LogLevel {
	Error = "ERROR",
	Warning = "WARNING",
	Info = "INFO",
}

// UTILITY TYPES
// Built-in type transformations (no direct C# equivalent)
interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

type PartialTodo = Partial<Todo>; // All properties optional
type ReadonlyTodo = Readonly<Todo>; // All properties readonly
type TodoPreview = Pick<Todo, "id" | "title">; // Select specific properties
type TodoWithoutId = Omit<Todo, "id">; // Exclude specific properties

// ASYNC/AWAIT
// Same concept as C# async/await
async function fetchUser(id: number): Promise<User> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				name: "Alice",
				email: "alice@example.com",
				createdAt: new Date(),
			});
		}, 1000);
	});
}

async function getUserData(id: number): Promise<void> {
	try {
		const user = await fetchUser(id);
		console.log("User:", user);
	} catch (error) {
		console.error("Error:", error);
	}
}

// MAIN FUNCTION
function main(): void {
	console.log("TypeScript vs C# Comparison");
	console.log("----------------------------");

	// Basic examples
	console.log("Add:", add(5, 3));
	console.log("Greet:", greet("TypeScript"));
	console.log("Sum:", sum(1, 2, 3, 4, 5));

	// Union types example
	printId("ABC123");
	printId(456);

	// Class example
	const person = new Person(1, "Alice", 30, new Date("1994-01-01"));
	console.log(person.introduce());

	const employee = new Employee(2, "Bob", 35, new Date("1989-05-15"), 75000);
	console.log(employee.introduce());

	// Generic example
	console.log("Identity:", identity("TypeScript"));

	console.log("\nExperiment with the examples above!");
}

main();
