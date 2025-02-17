document.addEventListener('DOMContentLoaded', function() {
document.getElementById('fetchImageBtn').addEventListener('click', fetchImage);
});

function fetchImage() {
    chrome.runtime.sendMessage({ action: 'fetchImage' }, response => {
      if (response && response.img_url) {
        displayImage(response.img_url);
      } else {
        console.error('Error fetching image');
      }
    });
}

function displayImage(imgUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imgUrl}" alt="Fetched Image">`;
}
