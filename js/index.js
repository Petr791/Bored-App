const appTitleNode = document.querySelector('#app-title');
const appTextNode = document.querySelector('#app-text');
const appBtnNode = document.getElementById('app-btn');
const bodyNode = document.querySelector('body');
const url = 'https://apis.scrimba.com/bored/api/activity';


/*Вариант 1. Используется JS */

/* JS. Выполнение функции приложения с помощью fetch */
appBtnNode.addEventListener('click', getRandomActivity);

/* JS. Выполнение функции приложения с помощью XMLHttpRequest */
//appBtnNode.addEventListener('click', getRandomActivityXHR);

/* Проверка */
//appBtnNode.addEventListener('click', debugging);

// функция с fetch
function getRandomActivity() {
	fetch(url)
		.then(data => data.json())
		.then(res => {
			if (res.status == 'success') {
				return;
			}
			console.log(res.activity);

			bodyNode.classList.add('activity-bg');
			appTitleNode.innerText = '🚀 Ура, теперь не скучно 🪐'
			appTextNode.innerHTML = `💥<span class="span">&nbsp;${res.activity}&nbsp;</span>💥`;
		})

}


// Функция с устаревшим способом (объект XMLHttpRequest)
function getRandomActivityXHR() {

	// 1. Создаём новый XMLHttpRequest-объект
	let xhr = new XMLHttpRequest();

	// 2. Настраиваем его: GET-запрос по URL 
	xhr.open('GET', url);
	xhr.responseType = 'json';

	// 3. Отсылаем запрос
	xhr.send();

	// 4. Этот код сработает после того, как мы получим ответ сервера
	xhr.onload = function () {
		if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
			console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
		} else { // если всё прошло гладко, выводим результат
			let responseXHR = xhr.response;
			console.log(responseXHR.activity);

			bodyNode.classList.add('activity-bg');
			appTitleNode.innerText = '🚀 Ура, теперь не скучно 🪐'
			appTextNode.innerHTML = `💥<span class="span">&nbsp;${responseXHR.activity}&nbsp;</span>💥`;
		}
	};

	// если нужно
	// xhr.onprogress = function (event) {
	// 	if (event.lengthComputable) {
	// 		console.log(`Получено ${event.loaded} из ${event.total} байт`);
	// 	} else {
	// 		console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
	// 	}
	// };

	// запрос не получился
	xhr.onerror = function () {
		console.log("Запрос не удался");
	};
};


// функция отладки
function debugging() {
	bodyNode.classList.add('activity-bg');
	appTitleNode.innerText = '🚀 Ура, теперь не скучно 🪐'
	appTextNode.innerHTML = `💥<span class="span">&nbsp;Пример&nbsp;</span>💥`;
}









//*********************************** */

/*Вариант 2. Используется jQuery */

$(document).ready(function () {
	//console.log('Готово!');

	/* jQuery. Выполнение функции приложения с помощью методов jQuery */
	//$('#app-btn').on('click', getRandomActivityJQuery);

	/* Проверка */
	//$('#app-btn').on('click', debuggingJQuery); // проверка


	// функция с методами $.ajax,$.get и $.getJSON
	function getRandomActivityJQuery() {

		// var-2.1
		$.ajax({
			url: url,
			method: 'get',
			dataType: 'json',
			cache: false,
			success: function (data) {
				console.log(data.activity);
				$('body').addClass('activity-bg');
				$('#app-title').text('🚀 Ура, теперь не скучно 🪐');
				let str = '💥<span class="span">&nbsp;' + data.activity + '&nbsp;</span>💥';
				$('#app-text').html(str);
			},
			error: function (jqXHR, exception) {
				if (jqXHR.status === 0) {
					alert('Not connect. Verify Network.');
				} else if (jqXHR.status == 404) {
					alert('Requested page not found (404).');
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error (500).');
				} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
				} else if (exception === 'timeout') {
					alert('Time out error.');
				} else if (exception === 'abort') {
					alert('Ajax request aborted.');
				} else {
					alert('Uncaught Error. ' + jqXHR.responseText);
				}
			}
		});



		// var-2.2
		/* 	$.get(url, function (data) {
				if (data.isValid == false) {
					console.log('yyy');
					return false;
				}
				console.log(data.activity);
				$('body').addClass('activity-bg');
				$('#app-title').text('🚀 Ура, теперь не скучно 🪐');
				let str = '💥<span class="span">&nbsp;' + data.activity + '&nbsp;</span>💥';
				$('#app-text').html(str);
			}); */




		// var-2.3
		/* 	$.getJSON(url,
				function (data) {
					if (data.isValid == false) {
						console.log('yyy');
						return false;
					}
					console.log(data.activity);
					$('body').addClass('activity-bg');
					$('#app-title').text('🚀 Ура, теперь не скучно 🪐');
					let str = '💥<span class="span">&nbsp;' + data.activity + '&nbsp;</span>💥';
					$('#app-text').html(str);
				}
			); */
	}





	// функция отладки
	function debuggingJQuery() {
		let example = 'пример'
		let debugStr = '💥<span class="span">&nbsp;' + example + '&nbsp;</span>💥';

		$('body').addClass('activity-bg');
		$('#app-title').text('🚀 Ура, теперь не скучно 🪐');
		$('#app-text').html(debugStr);
	}

});