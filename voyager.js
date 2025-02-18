document.addEventListener('DOMContentLoaded', function() {
    fetchContent();
});

function fetchContent() {
    chrome.runtime.sendMessage({ action: 'fetchContent' }, response => {
      if (response) {
        displayImage(response.img_url);
        displayTitle(response.title);
        //displayExplanation(response.explanation);
      } else {
        console.error('Error fetching content');
      }
    });
}

function displayImage(imgUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imgUrl}" alt="Fetched Image">`;
}

function displayTitle(title) {
    const titleContainer = document.getElementById('title');
    titleContainer.textContent = title; // textContext -> textContent
}

function displayExplanation(explanation) {
    const explanationContainer = document.getElementById('explanation');
    explanationContainer.textContent = explanation; // textContext -> textContent
}
