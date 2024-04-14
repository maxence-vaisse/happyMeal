document.addEventListener('DOMContentLoaded', function() {
    // Vos données pour l'autocomplétion
    var suggestions = [
        "Pâtes",
        "Pizza",
        "Salade",
        "Soupe",
        "Tacos",
        "Burger",
        "Poulet rôti",
        "Poisson",
        "Végétarien",
        "Dessert"
    ];

    // Initialiser l'autocomplétion
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data: suggestions
    });
});
