const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const preLoader = document.getElementById('loading');
setTimeout(() => {
    preLoader.style.display = 'none';
}, 3000);


function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    return Promise.race([
        fetch(resource),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

function displayBlock(articles) {
    
    blogContainer.innerHTML = "";

    if (!Array.isArray(articles)) {
        const errorBlock = document.createElement('p');
        errorBlock.textContent = "No articles found or an error occurred.";
        blogContainer.appendChild(errorBlock);
        return;
    }

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

// ...existing code...

async function fetchRandomNews() {
    const loading = document.createElement('h2');
    loading.textContent = "Checking Connection";
    blogContainer.appendChild(loading);

    try {
        const apiUrl = `http://localhost:3000/api/news`;
        const response = await fetchWithTimeout(apiUrl, { timeout: 5000 });
        const data = await response.json();
        blogContainer.removeChild(loading);

        // Show API error message if present
        if (!data.articles) {
            const errorBlock = document.createElement('p');
            errorBlock.textContent = data.message
                ? `Error: ${data.message}`
                : "No articles found or an error occurred.";
            blogContainer.appendChild(errorBlock);
            return [];
        }

        return data.articles;
    } catch (error) {
        blogContainer.removeChild(loading);
        const errorBlock = document.createElement('p');
        if (error.message === "Failed to fetch" || error.message === "timeout") {
            errorBlock.textContent = "Error: Server not connected. Please check if the backend server is running.";
        } else {
            errorBlock.textContent = "Error: Internet disconnected, Please check your Internet Connection or try again later";
        }
        blogContainer.appendChild(errorBlock);
        return [];
    }
}

async function fetchNewsQuery(searchQuery) {
    const loading = document.createElement('h2');
    loading.textContent = "Checking Connection";
    blogContainer.appendChild(loading);

    try {
        const apiUrl = `http://localhost:3000/api/news?q=${encodeURIComponent(searchQuery)}`;
        const response = await fetchWithTimeout(apiUrl, { timeout: 5000 });
        const data = await response.json();
        blogContainer.removeChild(loading);

        // Show API error message if present
        if (!data.articles) {
            const errorBlock = document.createElement('p');
            errorBlock.textContent = data.message
                ? `Error: ${data.message}`
                : "No articles found or an error occurred.";
            blogContainer.appendChild(errorBlock);
            return [];
        }

        return data.articles;
    } catch (error) {
        blogContainer.removeChild(loading);
        const errorBlock = document.createElement('p');
        if (error.message === "Failed to fetch" || error.message === "timeout") {
            errorBlock.textContent = "Error: Server not connected. Please check if the backend server is running.";
        } else {
            errorBlock.textContent = "Error: Internet disconnected, Please check your Internet Connection or try again later";
        }
        blogContainer.appendChild(errorBlock);
        return [];
    }
}

// ...existing code...

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