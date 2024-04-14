// Liste des noms de recettes pour la barre de recherche
const recipes = [
    "Poulet rôti aux herbes",
    "Salade de quinoa aux légumes grillés",
    "Tarte aux pommes",
    "Soupe de lentilles",
    "Pâtes Carbonara",
    "Risotto aux champignons",
    "Salade de fruits frais",
    "Ratatouille provençale",
    "Salade César",
    "Risotto aux champignons",
    "Muffins aux myrtilles",
    "Lasagnes végétariennes",
    "Salade niçoise",
    "Tiramisu"
];
  
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
  
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query === '') {
        // Si la recherche est vide, alors la liste de résultats est vidée.
        searchResults.innerHTML = '';
        return;
    }
    const matchedRecipes = recipes.filter(recipe => recipe.toLowerCase().includes(query));
    displayResults(matchedRecipes);
});
  
function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        // Ajout de l'évènement de clic pour rediriger vers "recette.html"
        li.addEventListener('click', function() {
            window.location.href = 'recette.html?recipe=' + encodeURIComponent(result);
        });
        searchResults.appendChild(li);
    });
}
  