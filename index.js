const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const status = document.getElementById("status");
const result = document.getElementById("result");

async function fetchWord(word) {
  const url =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" +
    encodeURIComponent(word);
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error("Word not found. Check your spelling.");
  }

  if (!response.ok) {
    throw new Error("The dictionary service could not complete your search.");
  }

  return response.json();
}

function buildEntry(entry) {
  const audio = (entry.phonetics || []).find(function (p) {
    return p.audio;
  });

  const article = document.createElement("article");
  article.className = "word-entry";

  const title = document.createElement("h3");
  title.className = "word-title";
  title.textContent = entry.word;
  article.appendChild(title);

  const phonetic = document.createElement("p");
  phonetic.className = "phonetic";
  phonetic.textContent = entry.phonetic || "";
  article.appendChild(phonetic);

  if (audio) {
    const audioButton = document.createElement("button");
    audioButton.className = "audio-btn";
    audioButton.type = "button";
    audioButton.textContent = "Play pronunciation";
    audioButton.addEventListener("click", function () {
      playAudio(audio.audio);
    });
    article.appendChild(audioButton);
  }

  entry.meanings.forEach(function (meaning) {
    const partOfSpeech = document.createElement("p");
    partOfSpeech.className = "part-of-speech";
    partOfSpeech.textContent = meaning.partOfSpeech;
    article.appendChild(partOfSpeech);

    const definitions = document.createElement("ol");
    definitions.className = "definitions";
    meaning.definitions.forEach(function (def) {
      const definition = document.createElement("li");
      definition.textContent = def.definition;
      definitions.appendChild(definition);
    });
    article.appendChild(definitions);

    if (meaning.synonyms.length > 0) {
      const synonyms = document.createElement("p");
      synonyms.className = "synonyms";
      synonyms.textContent = "Synonyms: " + meaning.synonyms.join(", ");
      article.appendChild(synonyms);
    }
  });

  return article;
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
  result.replaceChildren();

  try {
    const entries = await fetchWord(word);
    status.textContent = "";

    const entriesFragment = document.createDocumentFragment();
    entries.forEach(function (entry) {
      entriesFragment.appendChild(buildEntry(entry));
    });

    result.replaceChildren(entriesFragment);
  } catch (error) {
    status.textContent = error.message;
    status.style.color = "red";
  }
}

form.addEventListener("submit", handleSearch);