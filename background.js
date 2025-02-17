chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchImage') {
      getImageOfTheDay().then(imgUrl => {
        sendResponse({ img_url: imgUrl });
      });
      return true; // Async response
    }
  });
  
  async function getImageOfTheDay() {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
      
      chrome.storage.local.get(['apod_date', 'apod_url'], (result) => {
        if (result.apod_date === today && result.apod_url) {
          // 이미 조회한 경우 저장된 URL 반환
          resolve(result.apod_url);
        } else {
          // 새로운 이미지 조회
          fetchImageFromAPI(today).then(imgUrl => {
            chrome.storage.local.set({ apod_date: today, apod_url: imgUrl }, () => {
              resolve(imgUrl);
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
    return data.url;
  }
  
