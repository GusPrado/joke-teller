const button = document.getElementById('button');
const audioEl = document.getElementById('audio');

const toggleButton = () => {
  button.disabled = !button.disabled;
};

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: '<YOUR_API_KEY_HERE>',
    src: joke,
    hl: 'en-us',
    v: 'John',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

const getJokes = async () => {
  let joke = '';

  try {
    const apiUrl =
      'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (err) {
    console.log('catch error', err);
  }
};

button.addEventListener('click', getJokes);
audioEl.addEventListener('ended', toggleButton);
