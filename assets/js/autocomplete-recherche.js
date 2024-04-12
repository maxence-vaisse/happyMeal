document.addEventListener('DOMContentLoaded', function() {
    // Charger le fichier JSON
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            // Extraire les noms des recettes
            var recettes = data.recettes.map(recette => recette.nom);

            // Initialiser l'autocomplétion
            var elems = document.querySelectorAll('.autocomplete');
            var instances = M.Autocomplete.init(elems, {
                data: recettes
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});