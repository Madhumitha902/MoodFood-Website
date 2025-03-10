// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password) {
        localStorage.setItem('userEmail', email);
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Please enter both email and password.');
    }
});

// General Food List for Search
const foodDatabase = [
    { name: 'Chocolate Cake', url: 'https://www.allrecipes.com/recipe/8372/black-magic-cake/', calories: 350 },
    { name: 'Pizza', url: 'https://www.dominos.com/', calories: 800 },
    { name: 'Ice Cream', url: 'https://www.benjerry.com/flavors', calories: 300 },
    { name: 'Soups', url: 'https://www.panerabread.com/content/panerabread_com/en-us/menu/categories/soups-and-mac.html', calories: 150 },
    { name: 'Coffee', url: 'https://www.starbucks.com/menu/drinks/coffee', calories: 5 },
    { name: 'Energy Smoothie', url: 'https://www.bbcgoodfood.com/recipes/breakfast-super-shake', calories: 200 },
    { name: 'Spicy Tacos', url: 'https://www.tacobell.com/food/cravings-value-menu/spicy-potato-soft-taco', calories: 450 },
    { name: 'Chili Chicken', url: 'https://thehillfoodco.com/s/stl-indian-kitchen/2360-hampton-ave-st.-louis/14a96c44-4e44-46fd-b767-952dfabf18e1/Chicken%2065/6c9614fb-e503-4034-ae07-eb65b0c574b7https://www.foodnetwork.com/recipes/spicy-beef-chili-3352600', calories: 600 },
    { name: 'Sushi', url: 'https://www.sushisamba.com/menu', calories: 300 },
    { name: 'Celebration Cake', url: 'https://www.sarahscakeshopstl.com/', calories: 400 },
    { name: 'Herbal Tea', url: 'https://www.stashtea.com/collections/herbal-tea', calories: 0 },
    { name: 'Mac and Cheese', url: 'https://www.kraftmacandcheese.com/recipes', calories: 500 }
];

// Search Food Function
function searchFood() {
    console.log('searchFood() called'); // Debug: Check if function runs
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) {
        console.error('Search elements not found:', { searchInput, searchResults });
        return;
    }

    const query = searchInput.value.trim().toLowerCase();
    console.log('Search query:', query); // Debug: Log the query

    if (query) {
        const filteredFoods = foodDatabase.filter(food => 
            food.name.toLowerCase().includes(query)
        );
        console.log('Filtered foods:', filteredFoods); // Debug: Log results

        searchResults.innerHTML = '<h2>Search Results</h2>';
        if (filteredFoods.length > 0) {
            filteredFoods.forEach(food => {
                const resultCard = document.createElement('div');
                resultCard.className = 'meal-card';
                resultCard.innerHTML = `
                    <h3>${food.name}</h3>
                    <p>Calories: ${food.calories}</p>
                    <a href="${food.url}" target="_blank">Get it here</a>
                `;
                searchResults.appendChild(resultCard);
            });
        } else {
            searchResults.innerHTML += `<p>No results found for "${query}".</p>`;
        }
    } else {
        searchResults.innerHTML = '';
        alert('Please enter a search term.');
    }
}

// Mood Selection and Meal Recommendations
function selectMood(mood) {
    const mealSuggestions = document.getElementById('mealSuggestions');
    if (!mealSuggestions) return; // Skip if not on recommendations page

    mealSuggestions.innerHTML = '<h2>Recommended Meals</h2>';
    const recommendations = {
        happy: [
            { name: 'Chocolate Cake', url: 'https://www.allrecipes.com/recipe/8372/black-magic-cake/', calories: 350 },
            { name: 'Pizza', url: 'https://www.dominos.com/', calories: 800 }
        ],
        sad: [
            { name: 'Ice Cream', url: 'https://www.benjerry.com/flavors', calories: 300 },
            { name: 'Soup', url:'https://www.panerabread.com/content/panerabread_com/en-us/menu/categories/soups-and-mac.html/', calories: 150 }
        ],
        tired: [
            { name: 'Coffee', url: 'https://www.starbucks.com/menu/drinks/coffee', calories: 5 },
            { name: 'Energy Smoothie', url: 'https://www.bbcgoodfood.com/recipes/breakfast-super-shake', calories: 200 }
        ],
        angry: [
            { name: 'Spicy Tacos', url: 'https://www.tacobell.com/food/cravings-value-menu/spicy-potato-soft-taco', calories: 450 },
            { name: 'Chili Chicken', url: 'https://thehillfoodco.com/s/stl-indian-kitchen/2360-hampton-ave-st.-louis/14a96c44-4e44-46fd-b767-952dfabf18e1/Chicken%2065/6c9614fb-e503-4034-ae07-eb65b0c574b7', calories: 600 }
        ],
        excited: [
            { name: 'Sushi', url: 'https://www.sushisamba.com/menu', calories: 300 },
            { name: 'Celebration Cake', url: 'https://www.sarahscakeshopstl.com/', calories: 400 }
        ],
        stressed: [
            { name: 'Herbal Tea', url: 'https://www.stashtea.com/collections/herbal-tea', calories: 0 },
            { name: 'Mac and Cheese', url: 'https://www.kraftmacandcheese.com/recipes', calories: 500 }
        ]
    };

    if (recommendations[mood]) {
        recommendations[mood].forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `
                <h3>${meal.name}</h3>
                <p>Calories: ${meal.calories}</p>
                <a href="${meal.url}" target="_blank">Get it here</a>
                <label>Rate this suggestion:</label>
                <select onchange="submitFeedback('${meal.name}', this.value)">
                    <option value="">--Select--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            `;
            mealSuggestions.appendChild(mealCard);
        });
    } else {
        mealSuggestions.innerHTML += '<p>No recommendations available for this mood.</p>';
    }
}

// Feedback Submission
function submitFeedback(mealName, rating) {
    if (rating) {
        alert(`Thank you for rating ${mealName} with ${rating} stars!`);
    }
}

// Load Profile Data
window.onload = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        const emailElement = document.getElementById('userEmail');
        const preferencesElement = document.getElementById('userPreferences');
        if (emailElement) emailElement.textContent = userEmail;
        if (preferencesElement) preferencesElement.textContent = 'Mood-based meals';
    }
};