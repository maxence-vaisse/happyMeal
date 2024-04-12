document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true, // Activer le glisser-déposer
        events: []
    });
    calendar.render();

    // Récupérer les recettes favorites depuis le stockage local
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    // Ajouter automatiquement les recettes favorites planifiées pour le jour actuel dans le calendrier
    favoriteRecipes.forEach(recipe => {
        addFavoriteToCalendar(recipe);
    });

    // Fonction pour ajouter une recette favorite au calendrier
    function addFavoriteToCalendar(recipe) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        // Ajouter la recette favorite comme événement dans le calendrier
        calendar.addEvent({
            title: recipe.nom,
            start: formattedDate
        });
    }
});
