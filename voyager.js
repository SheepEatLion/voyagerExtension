document.getElementById('fetchImageBtn').addEventListener('click', fetchImage);

function fetchImage() {
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'; // 나사 API 엔드포인트 URL, 데모 키 사용. 횟수제한 존재.

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imgUrl = data.url;
            displayImage(imgUrl);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

function displayImage(imgUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imgUrl}" alt="Fetched Image">`;
}
