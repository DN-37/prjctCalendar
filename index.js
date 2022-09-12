let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.main');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

let currentMoment = {
	year: year,
	month: month,
	day: date.getDate()
};

draw(body, year, month);
initCalendar(year, month, currentMoment, calendar);

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
	createTable(body, nums);
}

function initCalendar(year, month, currentMoment, calendar) {
	var info = calendar.querySelector('.info');

	draw(body, year, month);
	showInfo(year, month, info);
	showDay(year, month, currentMoment, body);
}

function showInfo (year, month, elem) {
	elem.innerHTML = getMonthName(month) + ' ' + year;
}

function getMonthName(num) {
	var monthes = [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];

	return monthes[num];
}

let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

next.addEventListener('click', function() {
	year = getNextYear(year, month);
	month = getNextMonth(month);

	initCalendar(year, month, currentMoment, calendar);
});

prev.addEventListener('click', function() {
	year = getPrevYear(year, month);
	month =getPrevMonth(month);

	initCalendar(year, month, currentMoment, calendar);
});

function getNextYear(year, month) {
	if (month == 12) {
		year++;	
	} else {
		year;
	}
	return year;
}

function getNextMonth(month) {
	if (month >= 1 && month <= 11) {
		month++;
	} else {
		month = 1;
	}
	return month;
}

function getPrevYear(year, month) {
	if (month == 1) {
		year--;	
	} else {
		year;
	}
	return year;
}

function getPrevMonth(month) {
	if (month == 0) {
		month = 11;
	} else {
		month--;
	}
	return month;
}

function showDay(year, month, currentMoment, body) {
	if (year == currentMoment['year'] && month == currentMoment['month']) {
		var tds = body.querySelectorAll('td');

		for (var i = 0; i < tds.length; i++) {
			if (tds[i].innerHTML == currentMoment['day']) {
				tds[i].classList.add('active');
				break;
			}
		}
	}
}
