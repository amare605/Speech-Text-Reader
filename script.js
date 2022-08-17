//const
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// 將data 建立dom box

data.forEach(createBox);

// function
// 建立speech boxes
function createBox(item) {
    const box = document.createElement('div');
    // item deconstruct >> image, text
    const { image, text} = item;

    box.classList.add('box');

    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

    // 增加eventlistner
    box.addEventListener('click', ()=>{
        // 設定文字
        setTextMessage(text);
        // 朗讀
        speakText();

        // 增加 active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);

}

// 初始化 speech synth
const message = new SpeechSynthesisUtterance();

// 儲存聲音
let voices = [];

function getVoices () {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// 設定文字
function setTextMessage(text) {
    message.text = text;
}

// 朗誦文字
function speakText(){
    speechSynthesis.speak(message);
}

// 設定聲音
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);    
}

// 變更聲音
speechSynthesis.addEventListener('voiceschanged', getVoices);


// 開啟/關閉 文字方塊
toggleBtn.addEventListener('click' ,()=>
    document.getElementById('text-box').classList.toggle('show')
);

// 關閉文字方塊
closeBtn.addEventListener('click', ()=>
    document.getElementById('text-box').classList.remove('show')
);

// 變更聲音
voicesSelect.addEventListener('change', setVoice);

// 朗讀文字方塊
readBtn.addEventListener('click', ()=>{
    setTextMessage(textarea.value);
    speakText();
});

getVoices;