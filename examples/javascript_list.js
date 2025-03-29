const groceryList = [
	"Milk",
	"Eggs",
	"Bread",
	"Bananas 🍌",
	"Coffee ☕",
	"Chicken",
	"Rice",
	"Tomatoes 🍅"
];

// Create a urltodo-compatible data structure
function createTodoData(items) {
	const tasks = items.map(item => ({
		id: Date.now().toString,
		text: item,
		completed: false
	}));
	
	return {
		title: "Weekly Groceries",
		tasks: tasks
	};
}

// Encode the data for urltodo
function encodeForUrlTodo(data) {
	const jsonString = JSON.stringify(data);
	return btoa(unescape(encodeURIComponent(jsonString)));
}

// Generate the full URL
function generateTodoUrl(encodedData) {
	return `https://urltodo.com/#${encodedData}`;
}

const todoData = createTodoData(groceryList);
const encodedData = encodeForUrlTodo(todoData);
const todoUrl = generateTodoUrl(encodedData);

console.log("URL:");
console.log(todoUrl);
