'use strict';
{
  // WHAC-A-MOLE.html>img에 이미지 삽입
  const game_images = ['img/mole.png', 'img/mole.png', 'img/mole.png'];

  const mainImage0 = document.getElementById('1');
  const mainImage1 = document.getElementById('2');
  const mainImage2 = document.getElementById('3');

  const mainImages = [mainImage0, mainImage1, mainImage2];

  for (let i = 0; i < game_images.length; i++) {
    mainImages[i].src = game_images[i];
  }

  // 플레이 중이 아닌 상태
  let isPlaying = false;

  // 타이틀
  const title = document.getElementById('title');

  // 스코어
  const scoreLabel = document.getElementById('score');
  let score = 0;

  // 타이머 10초로 세팅
  const timerLabel = document.getElementById('timer');
  const timeLimit = 10 * 1000;
  let startTime;

  // 타이머 함수
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(1);
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    // 타임 오버 시 00.0초로 설정, coin, 마지막 두더지 숨기기, 타이틀 원 상태로, GAME OVER 알람
    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = '00.0';
      setTimeout(() => {
        coin = 0;
        hiding(img_id);
        title.textContent = 'CLICK TO START';
        alert('GAME OVER');
      }, 100);
    }
  }

  let img_id;
  let pre_num;
  let rand_num;
  let coin;

  // 중복 없는 랜덤숫자 1~3까지
  function rand_id() {
    rand_num = Math.floor(Math.random() * 4);
    if (pre_num !== rand_num && rand_num > 0) {
      pre_num = rand_num;
      return rand_num;
    }
    return rand_id();
  }

  // 두더지 튀어나오게 .ta-da class 입히기
  function ta_da(num) {
    num.classList.add('ta-da');
  }

  // 두더지 사라지게 .ta-da class 지우기
  function hiding(num) {
    num.classList.remove('ta-da');
  }

  // 3개 중 랜덤으로 두더지 나오는 함수
  function showMole() {
    // coin이 0 초과일 때 html에서 img id 를 불러와서 .ta-da 클래스 입히기, 클릭하면 catchMole 함수 실행
    if (coin > 0) {
      img_id = document.getElementById(`${rand_id()}`);
      ta_da(img_id);
      img_id.addEventListener('click', catchMole);
    }
  }

  // EventListener와 두더지 사라지는 함수
  function hideMole() {
    // 클릭 판정 지우고 다른 곳에서 두더지 나오게 catchMole 함수 실행, hiding함수로 .ta-da 클래스 지우기
    img_id.removeEventListener('click', catchMole);
    hiding(img_id);
  }

  // 두더지 누르면 스코어 업, 다른 곳에서 두더지 나오는 함수
  function catchMole() {
    // 두더지 사라지고 coin이 0초과일 때 스코어가 하나 씩 오름, 새로운 두더지 나오게 showMole함수 실행
    hideMole();
    if (coin > 0) {
      score++;
      scoreLabel.textContent = score;
    }
    showMole();
  }

  // 타이틀 클릭하면 플레이 시작, coin을 한 개로, 스코어 초기화, 타이틀 변경, 타이머 시작, 두더지 함수 시작
  title.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    coin = 1;
    score = 0;
    scoreLabel.textContent = score;

    title.textContent = '!! WHAC-A-MOLE !!';

    startTime = Date.now();
    updateTimer();

    showMole();
  });
}
