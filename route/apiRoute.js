const express = require('express');
const fs = require('fs');
const router = express.Router();
const readData = require('../JS/read_data.js');
const token = require('../JS/token.js');
const path = require('path');
const id = require('../JS/id.js');
const setData = require('../JS/set_data.js');
const { log } = require('console');

router.post( '/sign_up', async (req,res) => {
    const {username, password} = req.body;
    const obj = {
        username,
        filePath:'./data/users_list.json'
    }
    const user = await readData.userData(obj);
    if(user){
        res.json({usernameIs: true});
    }else {
        const userData = {
            username,
            password,
            id: await id.generateUnique('./data/users_list.json','./data/shoes_list.json'),
            cart   : "",
            userType   : "user",
            pfpPath: "/img/icons/user-icon.jpeg"
        }
        setData.createUser(userData,'./data/users_list.json');
        userToken = await token.generateToken('./data/cookies.json');
        token.createCookie('./data/cookies.json',userToken,userData.id);
        res.json({token :userToken});
    }
})

router.post( '/login', async (req,res) => {
    const {username, password} = req.body;
    const obj = {
        username,
        filePath:'./data/users_list.json'
    }
    const userData = await readData.userData(obj);
    let userToken ;
    let passwordIs = false ;
    let usernameIs = false ;
    if(userData){
        usernameIs = true;
        if(userData.password === password){
            passwordIs = true ;
            userToken = await token.generateToken('./data/cookies.json');
            token.createCookie('./data/cookies.json',userToken,userData.id);
            res.json({token :userToken});
        }else{
            res.json({usernameIs})
        }
    }else {
        res.json({usernameIs})
    }
})

router.get('/user', async (req,res) => {
    const userToken = req.query.data ;
    const userId = await token.checkToken('./data/cookies.json',userToken);
    const tempToken = token.temporaryToken();
    console.log(userId)
    if(userId){
        const userData = await readData.userDataById(userId,'./data/users_list.json');
        const {userType} = userData;
        res.json({tempToken,userType});
        router.get(`/${userType}/${tempToken}`,async (req , res)=>{
                res.sendFile(path.join(__dirname, '../views', `${userType}.html`))
            })
    
    }else {
        res.json(userId)
    }
})

module.exports = router;  
















