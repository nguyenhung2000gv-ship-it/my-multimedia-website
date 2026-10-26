document.addEventListener('DOMContentLoaded', () => {
  // 1. Xử lý Trình phát Video tùy chỉnh
  const video = document.getElementById('myVideo');
  const playBtn = document.getElementById('playPauseBtn');
  const seekBar = document.getElementById('seekBar');
  const timeDisplay = document.getElementById('timeDisplay');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused || video.ended) {
        video.play().then(() => {
          playBtn.textContent = 'Tạm dừng';
        }).catch(err => console.error('Lỗi phát video:', err));
      } else {
        video.pause();
        playBtn.textContent = 'Phát';
      }
    });

    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        seekBar.value = (video.currentTime / video.duration) * 100;
        let mins = Math.floor(video.currentTime / 60);
        let secs = Math.floor(video.currentTime % 60);
        timeDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    });

    seekBar.addEventListener('input', () => {
      if (video.duration) {
        video.currentTime = (seekBar.value / 100) * video.duration;
      }
    });
  }

  // 2. Xử lý nút "Xem thêm" tải dữ liệu từ media.json
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const mediaList = document.getElementById('mediaList');

  if (loadMoreBtn && mediaList) {
    loadMoreBtn.addEventListener('click', () => {
      fetch('media/media.json')
        .then(response => {
          if (!response.ok) throw new Error('Lỗi tải dữ liệu');
          return response.json();
        })
        .then(data => {
          mediaList.innerHTML = '';
          data.forEach(item => {
            const card = document.createElement('div');
            card.style.cssText = "background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;";
            card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            mediaList.appendChild(card);
          });
          loadMoreBtn.style.display = 'none';
        })
        .catch(err => console.error('Fetch error:', err));
    });
  }
});