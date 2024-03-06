const fs = require("fs");

//Reading the Quote.js \(0[]0)/

function getQuotesFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(`Error: ${err}`);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

//Tags ("_")

async function arrayTags(filePath) {
  const quotesFile = await getQuotesFile(filePath);
  let tags = new Set();
  quotesFile.forEach((quotes) => {
    quotes.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags);
}

//Authors (*/*)

async function arrayAuthors(filePath) {
  const quotesFile = await getQuotesFile(filePath);
  let authors = new Set();
  quotesFile.forEach((quotes) => {
    authors.add(quotes.author);
  });

  return Array.from(authors);
}

//Read author json file

async function readAuthorFile(authorsFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(authorsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
        reject(err);
      }else {
        resolve(JSON.parse(data));
      }
    });  
  });
}

//Id list 

async function getIdList(filePath){
  const data = await getQuotesFile(filePath);
  const idList = [];
  data.forEach(quote => {idList.push(quote.Id)})
  return idList;
}

//Main function

async function mainFun(filePath,authorsFilePath) {
  return {
    tags: await arrayTags(filePath),
    quotesFile: await getQuotesFile(filePath),
    authors: await arrayAuthors(filePath),
    authorsFile: await readAuthorFile(authorsFilePath),
    idList: await getIdList(filePath)
  };
}

//Exports ==>>

module.exports = mainFun;

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░██▓▓▓▓▓▓██▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████▓▓▓▓▓▓██░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░▓▓██▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓▓▓██▓▓░░░░░░░░░░░░
// ░░░░░░░░░░░░████▓▓▓▓  ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓  ▓▓▓▓████░░░░░░░░░░
// ░░░░░░░░░░░░████▓▓▓▓  ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓  ▓▓▓▓████░░░░░░░░░░
// ░░░░░░░░░░▒▒██▓▓▓▓░░  ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓  ░░▓▓▓▓██▒▒░░░░░░░░
// ░░░░░░░░░░████▓▓▒▒    ▓▓▓▓██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓    ▓▓▓▓████░░░░░░░░
// ░░░░░░░░░░██▓▓▓▓      ▓▓▓▓████░░░░░░░░░░░░░░░░░░░░░░░░░░░░████▓▓▓▓      ▓▓▓▓██░░░░░░░░
// ░░░░░░░░░░██▓▓▓▓      ▓▓▓▓▓▓██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓      ▓▓▓▓██░░░░░░░░
// ░░░░░░░░░░██▓▓▓▓      ▓▓▓▓▓▓██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓      ▓▓▓▓██░░░░░░░░
// ░░░░░░░░████▓▓▓▓      ▓▓▓▓▓▓████░░░░░░░░░░░░░░░░░░░░░░░░████▓▓▓▓▓▓      ▓▓▓▓████░░░░░░
// ░░░░░░░░██▓▓▓▓        ▓▓▓▓▓▓▓▓██░░░░░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓▓▓        ▓▓▓▓██░░░░░░
// ░░░░░░░░██▓▓▓▓            ▓▓▓▓▓▓██░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓            ▓▓▓▓██░░░░░░
// ░░░░░░░░██▓▓▓▓          ░░▓▓▓▓▓▓██░░░░░░░░░░░░░░░░░░░░██▓▓▓▓▓▓░░          ▓▓▓▓██░░░░░░
// ░░░░░░░░██▓▓▓▓        ░░  ▓▓▓▓▓▓██░░████████████████░░██▓▓▓▓██  ░░        ▓▓▓▓██░░░░░░
// ░░░░░░░░██▓▓        ░░  ░░░░▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░▒▒▒▒▒▒██▓▓▓▓▓▓  ░░  ░░        ▓▓██░░░░░░
// ░░░░░░██████      ░░  ░░  ▒▒▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░░░▒▒▒▒░░▓▓▓▓▓▓▒▒  ░░  ░░      ▓▓████░░░░
// ░░░░██████▓▓▒▒▒▒▒▒  ▒▒  ▒▒░░░░▓▓░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░▒▒▒▒  ▒▒  ▒▒▒▒▒▒▓▓██████░░
// ░░░░██░░▒▒▒▒▒▒▒▒▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒▒▒▒▒▒▒▒▒░░██░░
// ░░░░██░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░██░░
// ░░░░██░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░██░░
// ░░░░░░██░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░██░░░░
// ░░░░░░██░░▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░██░░░░
// ░░████░░▓▓░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒  ██░░████
// ░░██░░██░░░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░░░██░░██
// ░░██░░░░▒▒░░░░▒▒▒▒░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░▒▒▒▒░░░░▓▓░░░░██
// ░░██░░░░░░░░▒▒░░▒▒▒▒░░░░██░░░░░░      ░░░░░░░░░░░░      ░░░░░░██░░░░▒▒▒▒░░▒▒░░░░░░░░██
// ░░░░██░░░░░░▒▒░░▒▒▒▒░░░░██░░░░░░░░  ░░░░░░░░░░░░░░░░  ░░░░░░░░██░░░░▒▒▒▒▒▒▒▒░░░░░░██░░
// ░░░░▒▒██░░░░░░▒▒▒▒▒▒░░░░██▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓██░░░░▒▒▒▒▒▒░░░░░░██▒▒░░
// ░░░░░░░░▓▓░░░░░░▒▒▒▒▒▒▒▒██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████▒▒▒▒▒▒▒▒░░░░░░██░░░░░░
// ░░░░██████████░░░░▒▒░░▒▒░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░▒▒░░▒▒░░░░██████████░░
// ░░░░██░░░░░░░░▓▓░░░░░░▒▒▒▒▒▒██▓▓░░░░░░░░░░░░░░░░░░░░░░░░▓▓██▒▒▒▒▒▒░░░░░░▓▓░░░░░░░░██░░
// ░░░░░░██░░░░░░░░░░░░░░▒▒▒▒▒▒░░██░░▒▒▒▒░░░░░░░░░░░░▒▒▒▒░░██░░▒▒▒▒▒▒░░░░░░░░░░░░░░██░░░░
// ░░░░░░░░██████░░░░░░░░▒▒▒▒▒▒░░▓▓▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒░░░░░░░░██████░░░░░░
// ░░░░░░░░░░░░████░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░████░░░░░░░░░░
// ░░░░░░░░░░░░██████████░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░██████████░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓░░▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░▓▓▓▓░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░▒▒▒▒▒▒▒▒░░░░░░░░▒▒▒▒▒▒▒▒░░██░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░▒▒▒▒▒▒░░░░░░░░▒▒▒▒▒▒░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░▒▒▒▒░░░░░░░░▒▒▒▒░░▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░▒▒▒▒▒▒░░░░▒▒▒▒▒▒░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░▒▒▒▒▒▒▒▒▒▒▒▒░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░▓▓▓▓▓▓▒▒░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░▓▓▓▓▓▓▓▓░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
