// npm install --save-dev js-beautify
// npm install --save-dev jsdom

const fs = require("fs");
const { JSDOM } = require("jsdom");
const beautify = require("js-beautify");

function getLocale() {
  files = fs.readdirSync("./locate/").map((v) => `./locate/${v}`);
  return files;
}

let languages = {};
for (const file_path of getLocale()) {
  let lang = {};
  fs.readFileSync(file_path, { encoding: "utf8" })
    .split(/\r?\n/)
    .filter((v) => v.match(/^root\./))
    .forEach((v) => {
      const dat = v.split(/=/, 2);
      lang[dat[0]] = dat[1];
    });
  languages[file_path] = lang;
}

console.log(languages);

let index_f = fs.readFileSync("index.html", { encoding: "utf8" });
let index_dom = new JSDOM(index_f);
const DOCUMENT = index_dom.window.document;
let linefeed = DOCUMENT.createTextNode("\n");
for (const lang of Object.values(languages)) {
  if (!Object.keys(lang).length) continue;
  let head_link = DOCUMENT.createElement("link");
  head_link.setAttribute("rel", "alternate");
  head_link.setAttribute("hreflang", lang["root.hreflang"]);
  head_link.setAttribute(
    "href",
    `https://toka7290.github.io/gitflowtest/${lang["root.url_of_page"]}/`
  );
  DOCUMENT.head.appendChild(head_link);

  let body_link = DOCUMENT.createElement("a");
  body_link.setAttribute("href", `./${lang["root.url_of_page"]}/`);
  body_link.appendChild(DOCUMENT.createTextNode(lang["root.anchor"]));
  let body_link_div = DOCUMENT.createElement("div");
  body_link_div.classList.add("locate-link");
  body_link_div.appendChild(body_link);
  DOCUMENT.body.appendChild(body_link_div);
}

if (!fs.existsSync("./dist/")) {
  fs.mkdirSync("./dist/");
}
fs.writeFileSync(
  "./dist/index.html",
  beautify.html(DOCUMENT.documentElement.outerHTML, {
    preserve_newlines: false,
    max_preserve_newlines: 0,
  }),
  "utf8"
);
// console.log(beautify.html(DOCUMENT.documentElement.outerHTML));
