const fs = require('fs');

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNum(){
    let number = String.fromCharCode(generateRandomNumber(48,57));
    return number
}

function getRandomChar(){
    let char = String.fromCharCode(generateRandomNumber(97,122));
    return char
}

function randomChr(){
    const random = Math.random();

    if(random < 0.5){
        return getRandomNum();
    }else {
        return getRandomChar();
    }
}

function temporaryToken(length = 20){
    const tokenArr = [];
    for(i = 1;i < length; i++){
        tokenArr.push(randomChr());
    }
    return tokenArr.join('');
    
}

async function generateToken(filePath,length = 25){
    const tokenArr = [];
    for(i = 1;i < length; i++){
        tokenArr.push(randomChr());
    }
    const token = tokenArr.join('');
    const cookies = JSON.parse(await getCookies(filePath));
    const tokenList = [];
    cookies.forEach((cookie)=>{
        tokenList.push(cookie.token)
    })
    if(tokenList.includes(token)){
        return generateToken
    }else {
        return token;
    }  
}

function getCookies(path){
    return new Promise((resole,reject) => {
        fs.readFile(path,'utf-8',(error,data) => {
            if(error){
                reject(error)
            }else {
                resole(data)
            }
        })
    })
}

//function that takes the filepath and the token and return the user id number

async function checkToken(path,token){
    const  data = JSON.parse( await getCookies(path));
    let exist = false;
    let id;
    data.forEach(obj => {
        if(obj.token === token){
            exist = true ;
            id = obj.id;
            
        }
    });
    if(!exist){
        console.log('token not found');
        return exist
    }else {
            return id
        }
}



async function getTokenList(path){
    const tokenData = JSON.parse(await getCookies(path))
    const tokenList = [];
    tokenData.forEach(cookie => {
        tokenList.push(cookie.token)
    })
    return tokenList
}

// a function that takes file path, cookie and the user id to create a cookie on file

async function createCookie(path,token,id){
    const cookiesJsonFile = fs.readFileSync(path,'utf-8');
    const cookiesFile = JSON.parse(cookiesJsonFile);
    const cookie = {
        token,
        id
    }
    cookiesFile.push(cookie)
    fs.writeFile(path, JSON.stringify(cookiesFile,null,2), 'utf-8', (err) => {
        if (err) {
            console.log("There was an error writing the file: ",err);
        } else{
            console.log(`a cookie was added to the list`);
        }
    }); 
}

//delete cookie

async function deleteCookie(path,token){
    const cookiesJsonFile = fs.readFileSync(path,'utf-8');
    const cookiesFile = JSON.parse(cookiesJsonFile);
    cookiesFile.forEach((cookie,i) => {
        if(cookie.token === token){
            cookiesFile.splice(i,1)
        }
    })
    fs.writeFile(path, JSON.stringify(cookiesFile,null,2), 'utf-8', (err) => {
        if (err) {
            console.log("There was an error writing the file: ",err);
        } else{
            console.log(`a cookie was deleted from the list`);
        }
    }); 
}

// async function test(path,length){
//     const token = await generateToken(path,length);
//     console.log(token);
// }
// test('../data/cookies.json',10)

 module.exports = {
    checkToken,
    getTokenList,
    createCookie,
    deleteCookie,
    generateToken,
    temporaryToken
 }