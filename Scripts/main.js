//#region добавление прокручивания текста PASHABEZK при прокрутке страницы

const pashabezkText = document.getElementById("pashabezk-text");
pashabezkText.style.marginRight = "-250px";
pashabezkText.style.transition = "all linear";
window.addEventListener("scroll", () => {
	pashabezkText.style.marginRight = window.scrollY - 250 + "px";
}, false);

//#endregion


//#region local storage

const localStorageKeys = {
	/** web analytics AB-test */
	waAbTest: "waAbTest",
};

/** @typedef {"hex" | "card"} SiteVersion */

/** @type {Record<SiteVersion, SiteVersion>} */
const ProjectVariant = {
	card: "card",
	hex: "hex",
};

class WaAbTest {
	/** @type {SiteVersion} */
	static siteVersion = this.#chooseSiteVersion();

	/**
	 * @return {SiteVersion}
	 */
	static #chooseSiteVersion() {
		let siteVersion = localStorage.getItem(localStorageKeys.waAbTest);
		if (!siteVersion) {
			siteVersion = [ProjectVariant.hex, ProjectVariant.card][Math.floor(Math.random() * 2)];
			localStorage.setItem(localStorageKeys.waAbTest, siteVersion);
		}
		return siteVersion;
	}
}

// for debug
// window.addEventListener("beforeunload", () => { localStorage.clear(); });

//#endregion


//#region работа с сеткой проектов

/**
 * @typedef Project
 * @property {string} title - Заголовок проекта
 * @property {string} desc - Описание проекта
 * @property {string} link - Ссылка на проект
 * @property {string} imgLink - Путь к изображению
 */

/** Список проектов, которые надо разместить в сетке проектов */
const projects = [
	{
		"title": "Checkers",
		"desc": "React+Redux",
		"link": "https://github.com/pashabezk/CheckersOnlineFrontend",
		"imgLink": "Img\\Projects\\Checkers.png"
	},
	{
		"title": "Notes",
		"desc": "React+MobX",
		"link": "https://github.com/pashabezk/Notes",
		"imgLink": "Img\\Projects\\Notes.png"
	},
	{
		"title": "SimpleDrawApp",
		"desc": "React+Apollo",
		"link": "https://github.com/pashabezk/SimpleDrawApp",
		"imgLink": "Img\\Projects\\SimpleDrawApp.png"
	},
	{
		"title": "HappyNewYear",
		"desc": "JavaScript",
		"link": "https://github.com/pashabezk/HappyNewYearAnn",
		"imgLink": "Img\\Projects\\HappyNewYearAnn.png"
	},
	{
		"title": "DBComplexity",
		"desc": "Kotlin",
		"link": "https://github.com/pashabezk/DBComplexity",
		"imgLink": "Img\\Projects\\DBComplexity.png"
	},
	{
		"title": "ExamController",
		"desc": "Java",
		"link": "https://github.com/pashabezk/ExamController",
		"imgLink": "Img\\Projects\\ExamController.png"
	},
	{
		"title": "VKEmojiKeyboard",
		"desc": "JavaScript",
		"link": "https://github.com/pashabezk/VKEmojiKeyboard", //https://vkemojikeyboard.herokuapp.com/index.html
		"imgLink": "Img\\Projects\\VkKb.png"
	},
	{
		"title": "Maze Escape",
		"desc": "C++",
		"link": "https://github.com/pashabezk/MazeEscape",
		"imgLink": "Img\\Projects\\MazeEscape.png"
	},
	{
		"title": "AlienPlatformer",
		"desc": "Unity",
		"link": "https://github.com/pashabezk/AlienPlatformer",
		"imgLink": "Img\\Projects\\AlienPlatformer.png"
	},
	{
		"title": "TicTacToeTgBot",
		"desc": "Python",
		"link": "https://github.com/pashabezk/TicTacToeTgBot",
		"imgLink": "Img\\Projects\\TicTacToeTgBot.png"
	},
	{
		"title": "TgBotWithAI",
		"desc": "Python",
		"link": "https://github.com/pashabezk/MyFirstPythonTelegramBot",
		"imgLink": "Img\\Projects\\TgBotWithAI.png"
	},
	{
		"title": "DogBreeds",
		"desc": "React",
		"link": "https://github.com/pashabezk/DogBreeds",
		"imgLink": "Img\\Projects\\DogBreeds.png"
	},
	{
		"title": "Dialer",
		"desc": "Android",
		"link": "https://github.com/pashabezk/Dialer",
		"imgLink": "Img\\Projects\\Dialer.png"
	},
	{
		"title": "CarGame",
		"desc": "Win Forms (C#)",
		"link": "https://github.com/pashabezk/CarGame",
		"imgLink": "Img\\Projects\\CarGame.png"
	},
	{
		"title": "TankAndGear",
		"desc": "Win Forms (C#)",
		"link": "https://github.com/pashabezk/TankAndGear",
		"imgLink": "Img\\Projects\\TankAndGear.png"
	},
	{
		"title": "This site",
		"desc": "HTML+CSS+JS",
		"link": "https://github.com/pashabezk/MainPage",
		"imgLink": "Img\\Projects\\Site.png"
	}
];

class ProjectHex extends HTMLElement {
	/**
	 * @param project {Project} - объект проекта
	 */
	constructor(project) {
		super();
		this.appendChild(this.#createTemplate(project));
	}

	/**
	 * Создаёт разметку элемента
	 *
	 * @param project {Project} - объект проекта
	 *
	 * @example template result
	 * <li class="hex">
	 * 	<div class="hexIn">
	 * 		<a class="hexLink" href="javascript:void(0)">
	 * 			<img src="Img\Projects\2.jpg" alt=""/>
	 * 			<h2>Заголовок</h2>
	 * 			<p>Краткий текст</p>
	 * 		</a>
	 * 	</div>
	 * </li>
	 */
	#createTemplate(project) {
		this.classList.add("hex", "jumping-block");

		const div = document.createElement("div");
		div.classList.add("hexIn");

		const a = document.createElement("a");
		a.classList.add("hexLink");
		a.setAttribute("href", project.link);
		a.setAttribute("target", "_blank");

		const img = document.createElement("img");
		img.setAttribute("src", project.imgLink);
		img.setAttribute("alt", "фото проекта " + project.title);


		const h2 = document.createElement("h2");
		h2.innerText = project.title;

		const p = document.createElement("p");
		p.innerText = project.desc;

		a.appendChild(img);
		a.appendChild(h2);
		a.appendChild(p);
		div.appendChild(a);

		return div;
	}
}

class ProjectCard extends HTMLElement {
	static #cardTemplate = document.getElementById("project-card-template");

	/**
	 * @param project {Project} - объект проекта
	 */
	constructor(project) {
		super();
		this.appendChild(ProjectCard.#cardTemplate.content.cloneNode(true));
		this.#setData(project);
	}

	/**
	 * Создаёт разметку элемента
	 *
	 * @param project {Project} - объект проекта
	 */
	#setData(project) {
		this.classList.add("card-container", "jumping-block");

		const cardImg = this.querySelector(".card-img");
		cardImg.setAttribute("src", project.imgLink);

		const title = this.querySelector(".card-title");
		title.textContent = project.title;
		title.setAttribute("title", project.title);

		const description = this.querySelector(".card-description");
		description.textContent = project.desc;

		const links = this.querySelectorAll("a");
		links.forEach((link) => link.setAttribute("href", project.link));
	}
}

customElements.define("project-hex", ProjectHex);
customElements.define("project-card", ProjectCard);

const projectsGridHex = document.getElementById("projectsList");
const projectsGridCards = document.getElementById("card-grid");

if (WaAbTest.siteVersion === ProjectVariant.hex) {
	projects.forEach(elem => projectsGridHex?.appendChild(new ProjectHex(elem)));
	projectsGridCards.parentNode.removeChild(projectsGridCards);
} else {
	projects.forEach(elem => projectsGridCards?.appendChild(new ProjectCard(elem)));
	projectsGridHex.parentNode.removeChild(projectsGridHex);
}


//#endregion


//#region Создание возможности появления анимации при прокрутке страницы

function animateOnEntry(entry) {
	entry.forEach(elem => {
		if (elem.isIntersecting) {
			elem.target.classList.remove("hide-animation");
			elem.target.classList.add("show-animation");
		} else {
			elem.target.classList.remove("show-animation");
			elem.target.classList.add("hide-animation");
		}
	});
}

function jumpingTextOnEntry(entry) {
	entry.forEach(elem => {
		if (elem.isIntersecting) {
			elem.target.classList.remove("disable-animation-top");
			elem.target.classList.remove("disable-animation-bottom");
			elem.target.classList.add("show-animation");
		} else {
			elem.target.classList.remove("show-animation");
			elem.target.classList.add(elem.boundingClientRect.y <= 100 ? "disable-animation-top" : "disable-animation-bottom");
		}
	});
}

const observer = new IntersectionObserver(animateOnEntry, {threshold: [0.5]}); // создаем объект отслеживания, threshold - процент пересечения
for (const elem of document.querySelectorAll(".animate-it")) {
	observer.observe(elem); // применяем функцию отслеживания пересечения для всех объектов, у которых есть класс animate-it
}

const observerForJumpingText = new IntersectionObserver(jumpingTextOnEntry, {threshold: [0.3]}); // создаем объект отслеживания
for (const elem of document.querySelectorAll(".jumping-block")) {
	observerForJumpingText.observe(elem); // применяем функцию отслеживания пересечения для всех объектов, у которых есть класс jumping-block
}

//#endregion
