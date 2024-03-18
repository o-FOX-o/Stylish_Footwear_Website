const registerForm = document.querySelector("#register-form");
const passwordInput = document.querySelector('#pass-word');
const loginLink = document.querySelector('#login-link');
const body = document.querySelector( 'body' );
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
let canTrigger = true ;

loginLink.addEventListener("click", () => {
    const formBox = document.querySelector('.form-box');
    formBox.classList.add('puff-out-center');
    const computedStyle = window.getComputedStyle(body);
    const currentColor = computedStyle.backgroundColor ;
    const keyframe = `@keyframes turn-black{
        0%   {background: ${currentColor};}
        100%  {background: black;}
    }`
    styleElement.sheet.insertRule(keyframe);
    body.style.animation = 'turn-black 2s';
    setTimeout(()=>{
        body.style.backgroundColor = 'black';
        window.location.href = '/login';
    },2000)
})

passwordInput.addEventListener("dblclick", (event) => {
    if(canTrigger){
        canTrigger = false ;
        passwordInput.classList.add('reveal');
        setTimeout(() => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        },500)
        setTimeout(() => {
        passwordInput.classList.remove('reveal')
        },2000)
    };
    
    setTimeout(() => canTrigger = true,2000)
    
})
//fetch 

registerForm.setAttribute( "action", `http://${api}:${port}/api/register`);
registerForm.setAttribute("method","post"); 

registerForm.addEventListener( 'submit', async (event) => {  
    event.preventDefault();
    const formData = new FormData(registerForm);
    const objectFormData = Object.fromEntries(formData);
    const response = await fetch('/api/sign_up', {
        method: 'POST',
        body: JSON.stringify(objectFormData),
        headers: {
            'Content-Type': 'application/json'
        }
        });
    const data =  await response.json();
    if(data.token){
        document.cookie = `token=${data.token}; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/`;
    }else {
        const {usernameIs} = data;
        usernameIs? alert("This username is not available!") : null;
    }
})