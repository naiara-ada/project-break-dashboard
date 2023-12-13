

const getBackground = () =>{
    let numImage = Math.floor(Math.random()* 10 + 1 )
    document.body.style.backgroundImage = `url('../assets/img/${numImage}.jpg')`;
}

getBackground();

//const intervalBackground = setInterval(getBackground,15000);