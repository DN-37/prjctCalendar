let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.main');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

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