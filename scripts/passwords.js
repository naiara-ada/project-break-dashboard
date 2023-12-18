const btnPassword = document.getElementById('btnPassword');
const passwordgenerated = document.getElementById('passwordgenerated');

btnPassword.addEventListener('click', ()=>{
    const inputnumber = document.getElementById('inputnumber').value;
    let passWordfinal = getpassword(inputnumber);
    printPassword(passWordfinal);
})

const printPassword = (password)=>{
    passwordgenerated.innerHTML=`
    <h2>Contraseña generada:<h2>
    <p>${password}</p> `
}


const checkcharacter = (password, array)=>{
    let characterincludes;
    for (let i = 0; i < password.length; i++){
        characterincludes =  array.includes(password[i])
        if(characterincludes){
            break;
        }
    } 
    return characterincludes;
}

const checkPassword = (password)=>{
    const arrUpper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const arrLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const arrNumber = ['0','1','2','3','4','5','6','7','8','9'];
    const arrSymbol = ['!','@','#','$','%','^','&','*','(',')','-','_','=','+']
   
    //chequeamos que tenga al menos 1 de los simbolos si no vuelve a sacar una nueva password
    const upperPassword = checkcharacter(password,arrUpper);
    const lowerPassword = checkcharacter(password,arrLower);
    const numberPassword = checkcharacter(password, arrNumber);
    const symbolPassword = checkcharacter(password, arrSymbol);
           
    if (!upperPassword || !lowerPassword || !numberPassword || !symbolPassword){
        getpassword(password.length)
    }     
}

const getpassword = (number) =>{
    const arrPasskeys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','!','@','#','$','%','^','&','*','(',')','-','_','=','+']
    let newPassWord =[];
    
    for (let i = 0; i< number;i++){
        let randomNumber = Math.floor(Math.random() * 76 )
        newPassWord.push(arrPasskeys[randomNumber])        
    }
    
    checkPassword(newPassWord);
    return newPassWord.join('');
}

