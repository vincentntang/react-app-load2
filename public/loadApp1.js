console.log("Hello world!");

const fetchAssets = async () => {
  try {
    console.log("fetchAssets executed");

    const request = await (
      await fetch(`https://react-app-load1.netlify.app/asset-manifest.json`)
    ).json();

    console.log(request, "REQUEST");
    importFilesFromArray(request.entrypoints, "https://react-app-load1.netlify.app/");
  } catch (error) {
    console.error(error, "error");
    console.error("Error fetching app 1 assets");
  }
};

// Takes the provided array, parses it and loads all of the
// JS and CSS files based on their file extension.
function importFilesFromArray(files, rootURL) {
  console.log(files, "FILES");
  for (var i = 0; i < files.length; i++) {
    if (files[i].endsWith(".js")) {
      importJSFile(rootURL + files[i]);
    } else if (files[i].endsWith(".css")) {
      importCSSFile(rootURL + files[i]);
    }
  }
}

// Imports a single JS file.
function importJSFile(url) {
  console.log(url, "url");
  var jsElement = document.createElement("script");
  jsElement.src = url;
  jsElement.type = "text/javascript";

  var head = document.head;
  head.insertBefore(jsElement, head.childNodes[0]);
}

// Imports a single CSS file.
function importCSSFile(url) {
  var cssElement = document.createElement("link");
  cssElement.href = url;
  cssElement.rel = "stylesheet";
  cssElement.type = "text/css";

  var head = document.head;
  head.insertBefore(cssElement, head.childNodes[0]);
}


window.onload = function () {
  fetchAssets();
};
