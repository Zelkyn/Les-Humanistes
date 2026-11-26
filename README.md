# Les Humanistes — site web

Site statique (HTML, CSS, JavaScript sans dépendance) du parti **Les Humanistes**.

## Structure

```
index.html       Accueil : bannière, piliers, aperçu du programme
valeurs.html     Nos valeurs : les quatre piliers et les engagements
programme.html   Programme : thèmes dépliables, filtres et recherche
css/style.css    Styles (palette rouge vif / noir / blanc)
js/main.js       Menu mobile, accordéons, filtres et recherche du programme
assets/logo.svg  Logo provisoire
```

## Rédiger le contenu

Les textes à écrire sont repérés par la classe `a-rediger` (texte entre crochets,
souligné en pointillés rouges). Remplacez le texte puis retirez la balise
`<span class="a-rediger">` qui l'entoure.

Pour ajouter un thème au programme, dupliquez un bloc `<section class="theme">`
dans `programme.html`, changez son `id` et son `data-theme`, puis ajoutez le
bouton de filtre correspondant (`data-filtre`).

## Aperçu local

Ouvrez `index.html` dans un navigateur, ou lancez `python3 -m http.server`.
