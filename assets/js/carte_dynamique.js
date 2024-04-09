document.addEventListener('DOMContentLoaded', function() {
    // Charger les recettes depuis le fichier JSON
    fetch('assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            data.recettes.forEach(recette => {
                const cardHtml = `
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${recette.image}">
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${recette.nom}<i class="material-icons right">add</i></span>
                                <p><a href="#">Voir la recette</a></p>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${recette.nom}<i class="material-icons right">close</i></span>
                                <p>Temps de préparation : ${recette.temps_preparation}</p>
                                <p>Ingrédients : </p>
                                <ul>
                                ${recette.ingredients.map(ingredient => `<li>${ingredient.nom} : ${ingredient.quantite}</li>`).join('')}
                                </ul>
                                <p>Étapes : </p>
                                <ol>
                                ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                                </ol>
                            </div>
                            <div class="favorite-button" style="cursor: pointer;">
                                <i class="material-icons left-align" style="margin-left: 20px;">star_border</i>
                            </div>
                        </div>
                    </div>`;
                document.getElementById('cards-section').innerHTML += cardHtml;
            });
        })
        .catch(error => console.error('Une erreur s\'est produite lors du chargement des recettes :', error));
});
