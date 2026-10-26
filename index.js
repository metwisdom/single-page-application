const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const status = document.getElementById("status");
const result = document.getElementById("result");

async function fetchWord(word) {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Word not found. Check your spelling.");
  }

  return response.json();
}

function buildEntry(entry) {
  const audio = (entry.phonetics || []).find(function (p) {
    return p.audio;
  });

  let html = '<div class="word-entry">';
  html += '<h3 class="word-title">' + entry.word + '</h3>';
  html += '<p class="phonetic">' + (entry.phonetic || "") + '</p>';

  if (audio) {
    html += '<button class="audio-btn" onclick="playAudio(\'' + audio.audio + '\')">Play pronunciation</button>';
  }

  entry.meanings.forEach(function (meaning) {
    html += '<p class="part-of-speech">' + meaning.partOfSpeech + '</p>';
    html += '<ol class="definitions">';

    meaning.definitions.forEach(function (def) {
      html += '<li>' + def.definition + '</li>';
    });

    html += '</ol>';

    const synonyms = meaning.synonyms;
    if (synonyms.length > 0) {
      html += '<p class="synonyms">Synonyms: ' + synonyms.join(", ") + '</p>';
    }
  });

  html += '</div>';
  return html;
}

function playAudio(url) {
  const fullUrl = url.startsWith("http") ? url : "https:" + url;
  new Audio(fullUrl).play();
}

async function handleSearch(event) {
  event.preventDefault();
  const word = input.value.trim();

  if (!word) return;

  status.textContent = "Loading...";
  status.style.color = "gray";
  result.innerHTML = "";

  try {
    const entries = await fetchWord(word);
    status.textContent = "";

    let html = "";
    entries.forEach(function (entry) {
      html += buildEntry(entry);
    });

    result.innerHTML = html;
  } catch (error) {
    status.textContent = error.message;
    status.style.color = "red";
  }
}

form.addEventListener("submit", handleSearch);