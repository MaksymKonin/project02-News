!function(){document.querySelectorAll(".navigation-list__link");var e={formEl:document.querySelector(".js-form-search"),containerCategoriesEl:document.querySelector(".js-categories"),containerCardEl:document.querySelector(".js-container-card"),weatherCard:document.querySelector(".weather__card"),containerPaginationEl:document.querySelector(".js-pagination"),checkBoxEl:document.querySelector(".theme-switch__toggle"),bodyEl:document.querySelector("body")};var t,o="light-theme",a="dark-theme",l="themeKey";function r(t){t.target.checked?(e.bodyEl.classList.remove("ligth-theme"),e.bodyEl.classList.add("dark-theme"),localStorage.setItem(l,JSON.stringify(a))):(e.bodyEl.classList.remove("dark-theme"),e.bodyEl.classList.add("ligth-theme"),localStorage.setItem(l,JSON.stringify(o)))}console.log(1),document.querySelectorAll(".navigation-list__link").forEach((function(e){e.classList.contains("navigation-list__link--current")&&e.classList.remove("navigation-list__link--current"),window.location.href.includes(e.getAttribute("href"))&&e.classList.add("navigation-list__link--current")})),e.checkBoxEl.addEventListener("change",r),(t=localStorage.getItem(l))?"dark-theme"===JSON.parse(t)&&(e.bodyEl.classList.add("dark-theme"),e.checkBoxEl.checked=!0):(e.bodyEl.classList.add("ligth-theme"),localStorage.setItem(l,JSON.stringify(o)))}();
//# sourceMappingURL=favorite.a1781451.js.map
