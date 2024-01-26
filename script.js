'use strict';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const weekdays = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thurday',
	'Friday',
	'Saturday',
	'Sunday',
];

const deadlines = document.querySelectorAll('.deadline h4');
const timeLimit = document.querySelector('.s-heading');

const currentDate = new Date();
const tempDay = currentDate.getDay();
const tempDate = currentDate.getDate();
const tempYear = currentDate.getFullYear();
const tempMonth = currentDate.getMonth();

const futureDate = new Date(tempYear, tempMonth, tempDate + 10, 11, 30);

timeLimit.innerHTML = `giveaway ends on ${
	weekdays[futureDate.getDay() - 1]
}, ${futureDate.getDate()} ${
	months[futureDate.getMonth()]
} ${futureDate.getFullYear()}
${futureDate.getHours()}: ${futureDate.getMinutes()}am`;

function remainingTime() {
	const futureTime = futureDate.getTime();
	const today = new Date().getTime();
	const t = futureTime - today;

	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;

	const days = Math.floor(t / oneDay);
	const hours = Math.floor((t % oneDay) / oneHour);
	const minutes = Math.floor((t % oneHour) / oneMinute);
	const seconds = Math.floor((t % oneMinute) / 1000);

	const remaining = [days, hours, minutes, seconds];
	const format = function (deadline) {
		if (deadline < 10) {
			return (deadline = `0${deadline}`);
		}
		return deadline;
	};
	if (t > 0) {
		deadlines.forEach(function (deadline, index) {
			deadline.innerHTML = format(remaining[index]);
		});
	}

	if (t < 0) {
		clearInterval(countdown);
		timeLimit.innerHTML = `Sorry, this giveaway has expired`;
	}
}

let countdown = setInterval(remainingTime, 1000);
remainingTime();
