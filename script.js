const apiKey = '53897624554e4216a5f1d20114d76cb7';

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const preLoader = document.getElementById('loading');
setTimeout(() => {
    preLoader.style.display = 'none';
}, 3000);


// Helper to timeout fetch after 5 seconds
function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    return Promise.race([
        fetch(resource),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

async function fetchRandomNews() {
    const loading = document.createElement('h2');
    loading.textContent = "Checking Connection";
    blogContainer.appendChild(loading);

    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
        const response = await fetchWithTimeout(apiUrl, { timeout: 5000 });
        const data = await response.json();
        blogContainer.removeChild(loading);
        return data.articles;
    } catch (error) {
        console.log('Error fetching news:', error);
        blogContainer.removeChild(loading);
        const errorBlock = document.createElement('p');
        errorBlock.textContent = "Error: Internet disconnected, Please check your Internet Connection or try again later";
        blogContainer.appendChild(errorBlock);
        return [];
    }
}

async function fetchNewsQuery(searchQuery) {
    const loading = document.createElement('h2');
    loading.textContent = "Checking Connection";
    blogContainer.appendChild(loading);

    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetchWithTimeout(apiUrl, { timeout: 5000 });
        const data = await response.json();
        blogContainer.removeChild(loading);
        return data.articles;
    } catch (error) {
        console.error("Error fetching search news", error);
        blogContainer.removeChild(loading);
        const errorBlock = document.createElement('p');
        errorBlock.textContent = "Error: Internet disconnected, Please check your Internet Connection or try again later";
        blogContainer.appendChild(errorBlock);
        return [];
    }
}

function displayBlock(articles) {
    // Clear previous articles
    blogContainer.innerHTML = "";

    articles.forEach((article) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://via.placeholder.com/150';
        img.alt = article.title || 'No title';

        const title = document.createElement('h2');
        const titleText = article.title || "No Title";
        const truncatedTitle = titleText.length > 40 ? titleText.slice(0, 40) + "..." : titleText;
        title.textContent = truncatedTitle;

        const description = document.createElement('p');
        const descText = article.description || "No Description";
        const truncatedDescription = descText.length > 60 ? descText.slice(0, 60) + "..." : descText;
        description.textContent = truncatedDescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            if (article.url) window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener('click', async () => {
    const searchQuery = searchField.value.trim();
    if (searchQuery !== "") {
        const articles = await fetchNewsQuery(searchQuery);
        displayBlock(articles);
    }
});

(async () => {
    const articles = await fetchRandomNews();
    displayBlock(articles);
})();

// Loading Function

