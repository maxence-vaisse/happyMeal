document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const recipesPerPage = 9;
    let recipesData;
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Charger les recettes depuis le fichier JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            recipesData = data.recettes;
            renderRecipes(currentPage);
        })
        .catch(error => console.error('Une erreur s\'est produite lors du chargement des recettes :', error));

    // Ajoutez cette fonction pour mettre à jour la liste des recettes favorites dans la section "Vos recettes favorites"
    function updateFavoriteList() {
        const favoritesList = document.querySelector('.collection.with-header');
        favoritesList.innerHTML = ''; // Effacez d'abord la liste pour éviter les doublons

        if (favoriteRecipes.length > 0) {
            const header = document.createElement('li');
            header.className = 'collection-header';
            header.innerHTML = '<h4>Vos recettes favorites</h4>';
            favoritesList.appendChild(header);

            favoriteRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'collection-item';
                li.textContent = recipe.nom;
                favoritesList.appendChild(li);
            });
        } else {
            const header = document.createElement('li');
            header.className = 'collection-header';
            header.innerHTML = '<h4>Vos recettes favorites</h4>';
            favoritesList.appendChild(header);
        }
    }

    // Ajoutez cette fonction pour mettre à jour la liste des recettes favorites dans la section "Vos recettes favorites"
    function toggleFavorite(index) {
        const recipe = recipesData[index];
        recipe.isFavorite = !recipe.isFavorite;

        if (recipe.isFavorite) {
            favoriteRecipes.push(recipe);
        } else {
            const indexToRemove = favoriteRecipes.findIndex(favRecipe => favRecipe.id === recipe.id);
            if (indexToRemove !== -1) {
                favoriteRecipes.splice(indexToRemove, 1);
            }
        }

        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

        const star = document.querySelector(`.favorite-button i[data-index="${index}"]`);
        if (recipe.isFavorite) {
            star.classList.add('yellow-text');
            star.textContent = 'star';
        } else {
            star.classList.remove('yellow-text');
            star.textContent = 'star_border';
        }

        // Mettez à jour la liste des recettes favorites dans la section "Vos recettes favorites"
        updateFavoriteList();
    }

    function renderRecipes(page) {
        const startIndex = (page - 1) * recipesPerPage;
        const endIndex = startIndex + recipesPerPage;
        const recipesToShow = recipesData.slice(startIndex, endIndex);

        const cardSection = document.getElementById('cards-section');
        cardSection.innerHTML = '';

        recipesToShow.forEach((recette, index) => {
            const cardHtml = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="${recette.image}">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${recette.nom}<i class="material-icons right">add</i></span>
                            <p><a href="#">Ajouter la recette au panier</a></p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">${recette.nom}<i class="material-icons right">close</i></span>
                            <p>Temps de préparation : ${recette.temps_preparation}</p>
                            <p>Ingrédients : </p>
                            <ul>
                            ${recette.ingredients.map(ingredient => `<li>${ingredient.nom} : ${ingredient.quantite}</li><a class="waves-effect waves-light btn-small red add-to-cart" data-name="${ingredient.nom}">Ajouter l'ingrédient au panier</a>`).join('')}
                            </ul>
                            <p>Étapes : </p>
                            <ol>
                            ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="favorite-button" style="cursor: pointer;">
                            <i class="material-icons left-align ${recette.isFavorite ? 'yellow-text' : ''}" data-index="${startIndex + index}" style="margin-left: 20px;">${recette.isFavorite ? 'star' : 'star_border'}</i>
                        </div>
                    </div>
                </div>`;
            cardSection.innerHTML += cardHtml;
        });

        renderPagination(page);
        addFavoriteListeners();
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

    function addFavoriteListeners() {
        const favoriteButtons = document.querySelectorAll('.favorite-button');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const index = event.target.getAttribute('data-index');
                toggleFavorite(index);
            });
        });
    }
});
