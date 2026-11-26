/* Les Humanistes — interactions du site */
(function () {
  "use strict";

  // Année courante dans le pied de page
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Menu mobile
  var boutonMenu = document.querySelector(".nav__bouton");
  var menu = document.getElementById("menu");
  if (boutonMenu && menu) {
    boutonMenu.addEventListener("click", function () {
      var ouvert = boutonMenu.getAttribute("aria-expanded") === "true";
      boutonMenu.setAttribute("aria-expanded", String(!ouvert));
      menu.classList.toggle("est-ouverte", !ouvert);
    });
  }

  // ---------- Page Programme ----------
  var themes = Array.prototype.slice.call(document.querySelectorAll(".theme"));
  if (!themes.length) return;

  function basculer(theme, ouvrir) {
    var bouton = theme.querySelector(".theme__entete");
    var corps = theme.querySelector(".theme__corps");
    bouton.setAttribute("aria-expanded", String(ouvrir));
    corps.hidden = !ouvrir;
  }

  themes.forEach(function (theme) {
    theme.querySelector(".theme__entete").addEventListener("click", function () {
      basculer(theme, this.getAttribute("aria-expanded") !== "true");
    });
  });

  // Ouvre le thème ciblé par l'ancre (ex. programme.html#sante)
  function ouvrirDepuisAncre() {
    var cible = location.hash && document.getElementById(location.hash.slice(1));
    if (cible && cible.classList.contains("theme")) {
      basculer(cible, true);
      cible.scrollIntoView();
    }
  }
  ouvrirDepuisAncre();
  window.addEventListener("hashchange", ouvrirDepuisAncre);

  // Filtres par thème + recherche
  var filtres = Array.prototype.slice.call(document.querySelectorAll(".filtre"));
  var champ = document.getElementById("champ-recherche");
  var messageVide = document.querySelector(".aucun-resultat");
  var filtreActif = "tous";

  function normaliser(texte) {
    return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function appliquer() {
    var requete = champ ? normaliser(champ.value.trim()) : "";
    var visibles = 0;
    themes.forEach(function (theme) {
      var okFiltre = filtreActif === "tous" || theme.dataset.theme === filtreActif;
      var okRecherche = !requete || normaliser(theme.textContent).indexOf(requete) !== -1;
      theme.hidden = !(okFiltre && okRecherche);
      if (!theme.hidden) visibles++;
      if (requete && !theme.hidden) basculer(theme, true);
    });
    if (messageVide) messageVide.hidden = visibles > 0;
  }

  filtres.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      filtreActif = bouton.dataset.filtre;
      filtres.forEach(function (b) { b.setAttribute("aria-pressed", String(b === bouton)); });
      appliquer();
    });
  });
  if (champ) champ.addEventListener("input", appliquer);
})();
