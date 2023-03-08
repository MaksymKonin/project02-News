import { Notify } from 'notiflix/build/notiflix-notify-aio';
import changeTheme from './js/changeTheme';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';
import { createCalendar, calendarApiService } from './js/renderCalendar';
import NewsApiService from './js/newsApiService';
import normalaizData from './js/normalaizData';
import {
  renderNews,
  createCardNotFound,
  clearMarkupNews,
} from './js/renderNews';
import { createCategories } from './js/renderCategories';
import { refs } from './js/refs';
import {
  renderPagination,
  slicePage,
  activePageOnPagination,
} from './js/pagination';
import LocalStorageService from './js/localStorage';
const localStorageService = new LocalStorageService();
const newsApiService = new NewsApiService();

const HAVE_READ = 'have-read-id';
const FAVORITES_NEWS = 'favorite-news';
let haveReadArray = [];
let favoritesNewsArray = [];
let queryStorage = null;

changeTheme();

createCalendar();

//---render categories---

const categoriesAction = createListCategories();
categoriesAction.then(r => {
  createCategories(r, refs.containerCategoriesEl);
});

//---END OF render categories---

//run default weather
// renderWeatherCardContainer();
weatherMarkup();
//run weather according to location
userPositionConsent();

if (localStorageService.loadFilters()) {
  createNewsCategory();
} else createpopularNews();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.containerCategoriesEl.addEventListener('click', onCategoriesClick);
refs.containerCategoriesEl.addEventListener('change', onCategoriesClick);
refs.containerPaginationEl.addEventListener('click', onPaginationClick);

//ф-я обробка кліку по кнопці форми
function onFormSubmit(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  clearMarkupNews();
  newsApiService.searchQuery =
    evt.currentTarget.elements.searchQuery.value.trim();
  searchNews();
}
//ф-я обробка кліку по категоріям
function onCategoriesClick(evt) {
  evt.preventDefault();
  newsApiService.resetData();
  selectedCategories(evt);
}

//ф-я обробка кліку по пагінації/вибір номера сторінки
function onPaginationClick(evt) {
  evt.preventDefault();
  clearMarkupNews();
  const pageNum = evt.target.innerHTML;
  activePageOnPagination(pageNum);
  slicePage(pageNum, queryStorage);
}

//ф-я запиту новин по назві
async function searchNews() {
  clearMarkupNews();
  const response = await newsApiService.getsearchNews();
  try {
    if (response.response.docs.length === 0) {
      createCardNotFound();
      return;
    }
    let normalizedData = normalaizData(response.response.docs);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getsearchNews ', queryStorage);
    let paginationPage = renderPagination(queryStorage);
    renderNews(paginationPage);
    //  renderNews(normalizedData);
    // ------------------------------------------------------
    saveHaveReadNews();
    saveFavoriteNews(normalizedData);
    removeFavoriteNews(normalizedData);

    setDefaultParams(normalizedData);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}
//ф-я створення популярних новин
async function createpopularNews() {
  clearMarkupNews();
  const response = await newsApiService.getpopularNews();
  try {
    if (response.results.length === 0) {
      createCardNotFound();
      return;
    }
    let normalizedData = normalaizData(response.results);
    // -----------------------------------------------------------
    queryStorage = [...normalizedData];
    // console.log('queryStorage від запиту getpopularNews', queryStorage);

    let paginationPage = renderPagination(queryStorage);

    renderNews(paginationPage);
    // renderNews(normalizedData);
    // ------------------------------------------------------
    setDefaultParams(paginationPage);

    saveHaveReadNews(normalizedData);

    saveFavoriteNews(paginationPage);

    removeFavoriteNews(paginationPage);
  } catch (err) {
    Notify.failure('Sorry, an error occurred, try again later');
  }
}

//ф-я запиту новин по категорії
async function createNewsCategory() {
  let selectedDate = localStorageService.loadDataFilters();
  let selectedCategories = localStorageService.loadCategoriesFilters();
  const response = await newsApiService.getDateAndCategoryNews(
    selectedDate,
    selectedCategories
  );
  // try {
  if (response.response.docs.length === 0) {
    createCardNotFound();
    return;
  }

  let normalizedData = normalaizData(response.response.docs);
  // -----------------------------------------------------------
  queryStorage = [...normalizedData];
  // console.log('queryStorage від запиту getcategoryNews ', queryStorage);
  let paginationPage = renderPagination(queryStorage);
  renderNews(paginationPage);
  // renderNews(normalizedData);
  // ------------------------------------------------------

  setDefaultParams(paginationPage);

  saveHaveReadNews(paginationPage);

  saveFavoriteNews(paginationPage);

  removeFavoriteNews(paginationPage);

  setDefaultParams(normalizedData);

  // } catch (err) {
  //   Notify.failure('Sorry, an error occurred, try again later');
  // }
}

//ф-я запиту список категорій
async function createListCategories() {
  const arrayCategories = [];
  const response = await newsApiService.getlistCategories();
  response.results.forEach(element => {
    arrayCategories.push(element.section);
  });
  // console.log('categories-->', arrayCategories);
  return arrayCategories;
}
// свибір категорій/тестово
function selectedCategories(evt) {
  if (evt.type === 'click' && evt.target.nodeName === 'BUTTON') {
    addSelectedCategories(evt.target.textContent);
    console.log(0);
  } else if (evt.type === 'change' && evt.target.nodeName === 'SELECT') {
    addSelectedCategories(evt.target.value);
  }
  clearMarkupNews();
  createNewsCategory();
}

function addSelectedCategories(category) {
  let filters = localStorageService.loadFilters();
  let arraySelectedCategories = filters?.selectedCategories
    ? filters.selectedCategories
    : [];
  console.log(arraySelectedCategories);
  if (!arraySelectedCategories.includes(category)) {
    arraySelectedCategories.push(category);
    localStorageService.saveCategoriesFilters(arraySelectedCategories);
  } else {
    arraySelectedCategories.splice(
      arraySelectedCategories.indexOf(category),
      1
    );
    localStorageService.saveCategoriesFilters(arraySelectedCategories);
  }
}

function saveHaveReadNews(normalizedData) {
  const haveReadData = localStorageService.load(HAVE_READ);
  if (haveReadData) {
    haveReadData.map(haveReadElement => {
      const haveReadObj = {
        id: haveReadElement.id,
        abstract: haveReadElement.abstract,
        page_url: haveReadElement.page_url,
        photo_url: haveReadElement.photo_url,
        published_date: haveReadElement.published_date,
        section: haveReadElement.section,
        title: haveReadElement.title,
        date: haveReadElement.date,
      };
      haveReadArray.push(haveReadObj);
    });
  }

  const currentDate = new Date().getTime();

  const readMoreButtons = document.querySelectorAll('.read-more');
  let readMoreArray = Array.from(readMoreButtons);

  readMoreArray.map(readMoreLink => {
    readMoreLink.addEventListener('click', event => {
      const haveReadStatus =
        event.target.parentNode.parentNode.parentNode.firstElementChild;
      haveReadStatus.style.display = 'block';

      const parentLi = event.target.parentNode.parentNode.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;
      const isIncludeId = haveReadArray.includes(parentLiId);

      if (!isIncludeId) {
        normalizedData.map(element => {
          if (String(element.id_news) === parentLiId) {
            const haveReadObj = {
              id: parentLiId,
              abstract: element.abstract,
              page_url: element.page_url,
              photo_url: element.photo_url,
              published_date: element.published_date,
              section: element.section,
              title: element.title,
              date: currentDate,
            };
            haveReadArray.push(haveReadObj);
            localStorageService.save(HAVE_READ, haveReadArray);
          }
        });
      }
    });
  });
}

function saveFavoriteNews(normalizedData) {
  const addFavoriteButtons = document.querySelectorAll('.add-status-js');

  let favoriteButtonsArray = Array.from(addFavoriteButtons);

  favoriteButtonsArray.map(addButtonHTML => {
    addButtonHTML.addEventListener('click', event => {
      const addButton = event.target;
      const removeButton = addButton.nextElementSibling;
      const parentLi = addButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'none';
      removeButton.style.display = 'block';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          favoritesNewsArray.push(element);
          localStorageService.save(FAVORITES_NEWS, favoritesNewsArray);
        }
      });
    });
  });
}

function removeFavoriteNews(normalizedData) {
  const removeFavoriteButtons = document.querySelectorAll('.remove-status-js');
  let removeFavoriteButtonsArray = Array.from(removeFavoriteButtons);

  let favoriteNewsID = [];

  favoritesNewsArray = localStorageService.load(FAVORITES_NEWS) || [];
  if (favoritesNewsArray.length !== 0) {
    favoritesNewsArray.map(item => {
      favoriteNewsID.push(item.id_news);
    });
  }

  removeFavoriteButtonsArray.map(removeButtonHTML => {
    removeButtonHTML.addEventListener('click', event => {
      const removeButton = event.target;
      const addButton = removeButton.previousElementSibling;
      const parentLi = removeButton.parentNode.parentNode;
      const parentLiId = parentLi.dataset.idNews;

      addButton.style.display = 'block';
      removeButton.style.display = 'none';

      normalizedData.map(element => {
        if (String(element.id_news) === parentLiId) {
          const index = favoriteNewsID.indexOf(element.id_news);
          favoritesNewsArray.splice(index, 1);
          localStorageService.save(FAVORITES_NEWS, favoritesNewsArray);
        }
      });
    });
  });
}

function setDefaultParams(normalizedData) {
  const favoriteNews = localStorageService.load(FAVORITES_NEWS);
  const haveRead = localStorageService.load(HAVE_READ);

  let haveReadId = [];

  if (haveRead) {
    haveRead.map(haveReadItem => {
      haveReadId.push(haveReadItem.id);
    });
  }

  let favoriteNewsID = [];

  if (favoriteNews) {
    favoriteNews.map(item => {
      favoriteNewsID.push(item.id_news);
    });
    normalizedData.map(element => {
      const isFavorite = favoriteNewsID.includes(element.id_news);

      if (isFavorite) {
        const favoriteLi = document.querySelector(
          `[data-id-news="${element.id_news}"]`
        );
        const divTape = favoriteLi.firstElementChild;
        const buttonAdd = divTape.querySelector('.add-status-js');
        const buttonRemove = divTape.querySelector('.remove-status-js');

        buttonAdd.style.display = 'none';
        buttonRemove.style.display = 'block';
      }

      const isHaveRead = haveReadId.includes(String(element.id_news));

      if (isHaveRead) {
        const haveReadLi = document.querySelector(
          `[data-id-news="${element.id_news}"]`
        );
        const divTape = haveReadLi.firstElementChild;
        const haveReadStatus = divTape.querySelector('.status-reed');

        haveReadStatus.style.display = 'block';
      }
    });
  }
}
