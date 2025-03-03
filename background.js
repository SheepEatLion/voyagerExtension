chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchContent') {
      getImageOfTheDay().then(data => {
        sendResponse({ img_url: data.img_url, title: data.title, explanation: data.explanation });
      });
      return true; // Async response
    }
});

async function getImageOfTheDay() {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식

      chrome.storage.local.get(['apod_date', 'apod_url', 'apod_title', 'apod_explanation'], (result) => {
        if (result.apod_date === today && result.apod_url && result.apod_title && result.apod_explanation) {
          // 이미 조회한 경우 저장된 URL 반환
          resolve({ img_url: result.apod_url, title: result.apod_title, explanation: result.apod_explanation });
        } else {
          // 새로운 이미지 조회
          fetchImageFromAPI(today).then(data => {
            chrome.storage.local.set({ apod_date: today, apod_url: data.url, apod_title: data.title, apod_explanation: data.explanation }, () => {
              resolve({ img_url: data.url, title: data.title, explanation: data.explanation });
            });
          }).catch(reject);
        }
      });
    });
}

async function fetchImageFromAPI(today) {
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
        url: data.url,
        title: data.title,
        explanation: data.explanation
    };
}
