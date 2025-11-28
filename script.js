/* Мобильное меню */
const menuMobile = () => {
	const menuToggle = document.querySelector(".head__menu-toggle");
	const navMobile = document.querySelector(".head__nav-mobile");
	
	if (menuToggle && navMobile) {
		menuToggle.addEventListener("click", () => {
			const isExpanded = menuToggle.classList.toggle("active");
			navMobile.style.display = isExpanded ? "block" : "none";
			if (isExpanded) {
				setTimeout(() => navMobile.classList.add("active"), 10);
			} else {
				navMobile.classList.remove("active");
			}
		});
	}
	
	// Закрытие меню при клике на ссылку
	document.querySelectorAll(".nav-list-mobile__link").forEach(link => {
		link.addEventListener("click", () => {
			document.querySelector(".head__menu-toggle")?.classList.remove("active");
			document.querySelector(".head__nav-mobile").style.display = "none";
		});
	});
	
	// Закрытие при клике вне меню
	document.addEventListener("click", (e) => {
		const isClickInside = menuToggle.contains(e.target) || navMobile.contains(e.target);
		if (!isClickInside && menuToggle.classList.contains("active")) {
			menuToggle.classList.remove("active");
			navMobile.style.display = "none";
		}
	});
};

/* Кнопка Найти программу */
const btnSearchProgramMobile = () => {
	const form = document.querySelector('.block-search-program__form');
	const title = document.querySelector('.block-search-program__title');
	const btnSearch = document.getElementById('btn-search-program');
	
	btnSearch.addEventListener('click', (e) => {
		form.classList.add("active");
		btnSearch.style.display = "none";
		title.style.display = "none";
	})
	
	// Закрытие при клике вне меню
	document.addEventListener("click", (e) => {
		const isClickInside = form.contains(e.target) || btnSearch.contains(e.target);
		if (!isClickInside && form.classList.contains("active")) {
			form.classList.remove("active");
			btnSearch.style.removeProperty("display");
			title.style.removeProperty("display");
		}
	});
};

/* Выпадающее меню Select*/
const selectDropDown = () => {
	const selectButtons = document.querySelectorAll(".select-button");
	
	selectButtons.forEach((button) => {
		const dropdown = button.nextElementSibling;
		const options = dropdown.querySelectorAll("li");
		const selectedValueSpan = button.querySelector(".selected-value");
		
		// Открытие/закрытие
		button.addEventListener("click", () => {
			const isExpanded = button.getAttribute("aria-expanded") === "true";
			button.setAttribute("aria-expanded", !isExpanded);
			dropdown.classList.toggle("hidden");
			
			if (!isExpanded) {
				options[0]?.focus();
			}
		});
		
		// Выбор пункта
		options.forEach((option) => {
			option.addEventListener("click", () => {
				selectedValueSpan.textContent = option.textContent;
				button.setAttribute("aria-expanded", "false");
				dropdown.classList.add("hidden");
				option.setAttribute("aria-selected", "true");
				// Сброс предыдущих
				options.forEach((o) => o !== option && o.setAttribute("aria-selected", "false"));
			});
		});
		
		// Клавиатура: стрелки, Enter, Escape
		dropdown.addEventListener("keydown", (e) => {
			const focused = document.activeElement;
			if (e.key === "Escape") {
				button.setAttribute("aria-expanded", "false");
				dropdown.classList.add("hidden");
				button.focus();
			} else if (e.key === "Enter") {
				if (focused.tagName === "LI") {
					selectedValueSpan.textContent = focused.textContent;
					button.setAttribute("aria-expanded", "false");
					dropdown.classList.add("hidden");
					focused.setAttribute("aria-selected", "true");
					options.forEach((o) => o !== focused && o.setAttribute("aria-selected", "false"));
					button.focus();
				}
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				const index = [...options].indexOf(focused);
				const next = options[index + 1] || options[0];
				next.focus();
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				const index = [...options].indexOf(focused);
				const prev = options[index - 1] || options[options.length - 1];
				prev.focus();
			}
		});
		
		// Закрытие при клике вне
		document.addEventListener("click", (e) => {
			if (!button.contains(e.target)) {
				button.setAttribute("aria-expanded", "false");
				dropdown.classList.add("hidden");
			}
		});
	});
};

/* Поле выбора даты */
const calendar = () => {
	const dateInput = document.querySelector('.date-input');
	const calendar = document.getElementById('calendar');
	
	let selectedDate = null;
	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();
	
	// Названия месяцев и дней недели (понедельник — первый день)
	const months = [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];
	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	
	// Открыть/закрыть календарь по клику на поле
	dateInput.addEventListener('click', () => {
		calendar.classList.toggle('show');
		if (calendar.classList.contains('show')) {
			renderCalendar();
		}
	});
	
	// Закрыть календарь при клике вне поля и календаря
	document.addEventListener('click', (e) => {
		if (!dateInput.contains(e.target) && !calendar.contains(e.target)) {
			calendar.classList.remove('show');
		}
	});
	
	// Предотвращаем всплытие при клике внутри календаря
	calendar.addEventListener('click', (e) => {
		e.stopPropagation();
	});
	
	// Рендеринг календаря
	function renderCalendar() {
		// Очищаем содержимое календаря
		calendar.innerHTML = '';
		
		// Шапка: месяц, год и кнопки навигации
		const header = document.createElement('div');
		header.className = 'calendar-header';
		
		const prevBtn = document.createElement('button');
		prevBtn.className = 'nav-btn';
		prevBtn.textContent = '◀';
		prevBtn.addEventListener('click', (event) => {
			event.preventDefault();
			currentMonth--;
			if (currentMonth < 0) {
				currentMonth = 11;
				currentYear--;
			}
			renderCalendar();
		});
		
		const nextBtn = document.createElement('button');
		nextBtn.className = 'nav-btn';
		nextBtn.textContent = '▶';
		nextBtn.addEventListener('click', (event) => {
			event.preventDefault();
			currentMonth++;
			if (currentMonth > 11) {
				currentMonth = 0;
				currentYear++;
			}
			renderCalendar();
		});
		
		const monthYear = document.createElement('span');
		monthYear.className = 'month-year';
		monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
		
		header.appendChild(prevBtn);
		header.appendChild(monthYear);
		header.appendChild(nextBtn);
		calendar.appendChild(header);
		
		// Строка названий дней недели
		const daysHeader = document.createElement('div');
		daysHeader.className = 'week-days';
		weekDays.forEach(day => {
			const dayEl = document.createElement('div');
			dayEl.className = 'day-name';
			dayEl.textContent = day;
			daysHeader.appendChild(dayEl);
		});
		calendar.appendChild(daysHeader);
		
		// Сетка дней месяца
		const daysGrid = document.createElement('div');
		daysGrid.className = 'days-grid';
		
		// Первый день месяца (0 = воскресенье, 1 = понедельник, ..., 6 = суббота)
		const firstDay = new Date(currentYear, currentMonth, 1).getDay();
		// Переводим на систему: понедельник = 0
		const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
		
		// Количество дней в текущем месяце
		const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
		
		// Пустые ячейки перед первым днём месяца
		for (let i = 0; i < adjustedFirstDay; i++) {
			const emptyDay = document.createElement('div');
			daysGrid.appendChild(emptyDay);
		}
		
		// Создаём ячейки для каждого дня месяца
		for (let day = 1; day <= totalDays; day++) {
			const dayEl = document.createElement('div');
			dayEl.className = 'day';
			dayEl.textContent = day;
			
			const date = new Date(currentYear, currentMonth, day);
			
			// Выделяем сегодняшнюю дату
			const today = new Date();
			if (date.getDate() === today.getDate() &&
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()) {
				dayEl.classList.add('today');
			}
			
			// Проверяем, выбрана ли эта дата
			if (selectedDate &&
				date.getDate() === selectedDate.getDate() &&
				date.getMonth() === selectedDate.getMonth() &&
				date.getFullYear() === selectedDate.getFullYear()) {
				dayEl.classList.add('selected');
			}
			
			// Обработчик клика по дню
			dayEl.addEventListener('click', () => {
				selectedDate = new Date(currentYear, currentMonth, day);
				dateInput.value = formatDate(selectedDate);
				calendar.classList.remove('show');
			});
			
			daysGrid.appendChild(dayEl);
		}
		
		calendar.appendChild(daysGrid);
	}
	
	// Форматируем дату для отображения (ДД.ММ.ГГГГ)
	function formatDate(date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	}
	
	// Инициализация: отображаем текущий месяц
	renderCalendar();
};

/* Многоточие в тексте */
const ellipsis = () => {
	function getCountsRows (element) {
		const style = getComputedStyle(element);
		const height = parseInt(style.height);
		const lineHeight = parseInt(style.lineHeight);
		const lineH = isNaN(lineHeight) ? parseInt(style.fontSize) : lineHeight;
		console.log(height)
		console.log(lineHeight);
		console.log(lineH);
		console.log(height / lineH);
		return Math.floor(height / lineH);
	}
	
	const cardBlogText = document.querySelectorAll('.card-blog__text');
	
	cardBlogText.forEach((el) => {
		const lines = getCountsRows(el);
		el.style.webkitLineClamp = String(lines);
	});
};

/* Увеличение изображения */
const viewImage = () => {
	const previews = document.querySelectorAll('.photo-report__image');
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightbox-img');
	const closeBtn = document.querySelector('.close');
	
	// Открываем модальное окно
	previews.forEach(img => {
		img.addEventListener('click', function() {
			lightboxImg.src = this.dataset.large;
			lightboxImg.alt = this.alt;
			lightbox.classList.add('show');
		});
	});
	
	// Закрываем по крестику
	closeBtn.addEventListener('click', () => {
		lightbox.classList.remove('show');
	});
	
	// Закрываем по Esc
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
			lightbox.classList.remove('show');
		}
	});
	
	// Закрываем при клике на фон
	lightbox.addEventListener('click', e => {
		if (e.target === lightbox) {
			lightbox.classList.remove('show');
		}
	});
};



document.addEventListener("DOMContentLoaded", () => {
	menuMobile();
	btnSearchProgramMobile();
	selectDropDown();
	calendar();
	ellipsis();
	viewImage();
	
	window.addEventListener('resize', ellipsis);
});