let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.main');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

let arr = range(getLastDay(year, month));

let firstWeekDay = getFirstWeekDay(year, month);
let lastWeekDay  = getLastWeekDay(year, month);

let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
createTable(body, nums);

function normalize(arr, left, right) {
	for (let i = 0; i < left; i++) {
		arr.unshift('');
	}
	for (var i = 0; i < right; i++) {
		arr.push('');
	}
	
	return arr;
}

function chunk(arr, n) {
	let result = [];
	let count = Math.ceil(arr.length / n);
	
	for (let i = 0; i < count; i++) {
		let elems = arr.splice(0, n);
		result.push(elems);
	}
	
	return result;
}

function getLastDay(year, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDate();
}

function range(count) {
	let arr = [];
	
	for (let i = 1; i <= count; i++) {
		arr.push(i);
	}
	
	return arr;
}

function getFirstWeekDay(year, month) {
	let date = new Date(year, month, 1);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function getLastWeekDay(year, month) {
	let date = new Date(year, month + 1, 0);
	let num  = date.getDay();
	
	if (num == 0) {
		return 6;
	} else {
		return num - 1;
	}
}

function createTable(parent, arr) {
	parent.textContent = '';
	let cells = [];
	
	for (let sub of arr) {
		let tr = document.createElement('tr');
		
		for (let num of sub) {
			let td = document.createElement('td');
			td.textContent = num;
			tr.appendChild(td);
			
			cells.push(td);
		}
		
		parent.appendChild(tr);
	}
	
	return cells;
}

function draw(body, year, month) {
	let arr = range(getLastDay(year, month));
	
	let firstWeekDay = getFirstWeekDay(year, month);
	let lastWeekDay  = getLastWeekDay(year, month);
	
	let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
	createTable(body, nums)
}

draw(body, year, month);