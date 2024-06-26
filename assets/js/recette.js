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

        favoriteRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.textContent = recipe.nom;
            favoritesList.appendChild(li);
        });
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
        addIngredientToCartListeners(); // Ajout de la fonction pour écouter les clics sur "Ajouter l'ingrédient au panier"
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

    // Fonction pour ajouter des écouteurs d'événements pour chaque bouton "Ajouter l'ingrédient au panier"
    function addIngredientToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const ingredientName = event.target.getAttribute('data-name');
                const cartList = document.getElementById('cart-list');

                // Créer un élément li pour l'ingrédient
                const ingredientItem = document.createElement('li');
                ingredientItem.className = 'collection-item';
                ingredientItem.textContent = ingredientName;

                // Ajouter l'ingrédient à la liste des ingrédients du panier
                cartList.appendChild(ingredientItem);
            });
        });
    }
});
