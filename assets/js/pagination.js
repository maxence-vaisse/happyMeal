document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const recipesPerPage = 9;
    let recipesData;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            recipesData = data.recettes;
            renderRecipes(currentPage);
        })
        .catch(error => console.error('Une erreur s\'est produite lors du chargement des recettes :', error));

    function renderRecipes(page) {
        const startIndex = (page - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        const recipesToShow = recipesData.slice(startIndex, endIndex);

        const cardSection = document.getElementById('cards-section');
        cardSection.innerHTML = '';

        recipesToShow.forEach(recette => {
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
            cardSection.innerHTML += cardHtml;
        });

        renderPagination(page);
    }

    function renderPagination(currentPage) {
        const totalPages = Math.ceil(recipesData.length / recipesPerPage);
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = currentPage === i ? 'active' : 'waves-effect';
            const a = document.createElement('a');
            a.href = '#!';
            a.textContent = i;
            li.appendChild(a);
            pagination.appendChild(li);

            a.addEventListener('click', function() {
                currentPage = i;
                renderRecipes(currentPage);
            });
        }
    }
});
