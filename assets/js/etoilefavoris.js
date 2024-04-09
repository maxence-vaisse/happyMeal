document.addEventListener('DOMContentLoaded', function() {
    const favoriteButtons = document.querySelectorAll('.favorite-button');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const starIcon = button.querySelector('i');
            if (starIcon.textContent === 'star_border') {
                starIcon.textContent = 'star';
                starIcon.style.color = 'yellow'; // Change la couleur en jaune
                // Ajoutez ici le code pour marquer l'élément comme favori dans votre système
            } else {
                starIcon.textContent = 'star_border';
                starIcon.style.color = ''; // Réinitialise la couleur
                // Ajoutez ici le code pour supprimer l'élément des favoris dans votre système
            }
        });
    });
});