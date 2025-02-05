const timeclass = document.getElementsByClassName('timeclass');
const dateClass= document.getElementsByClassName('dateClass')
const timePhraseClass = document.getElementsByClassName('timePhraseClass');
const weeksDay = ['domingo', 'lunes','martes','miercoles','jueves', 'viernes','sabado']

const getactualPage = ()=>{
    let URLactual = window.location;
    let indexpage;
    URLactual.pathname == '/project-break-dashboard/clock.html' ? indexpage = false : indexpage = true;
    return indexpage;
}

const getTime = () =>{
    const today = new Date();
    const seconds = today.getSeconds().toString();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();
    const day = today.getDate().toString();
    let month = today.getMonth()+1;
    month = month.toString();
    let secondsCheck, minutesCheck, hoursCheck, dayCheck, monthCheck;
       
    //comprobamos que en caso de que la variable solo tenga 1 digito le añadimos un 0 por delante.
    seconds.length == 1 ? secondsCheck = '0'+ seconds : secondsCheck = seconds 
    minutes.length == 1 ? minutesCheck = '0'+ minutes : minutesCheck =  minutes
    hours.length == 1 ? hoursCheck = '0'+ hours : hoursCheck =  hours
    day.length == 1 ? dayCheck = '0' + day : dayCheck = day
    month.length == 1 ? monthCheck = '0' + month : monthCheck= month
 
    //pintamos en pantalla
    timeclass[0].textContent = `${hoursCheck}:${minutesCheck}:${secondsCheck}`
   dateClass[0].textContent  =`${weeksDay[today.getDay()]}, ${dayCheck}/${monthCheck}/${today.getFullYear()}`  
    
   //comprobamos de si estamos en la pagina index o la del clock para que aparezca o no la frase.
    let indexpage = getactualPage();
    if(!indexpage){ 
        timePhraseClass[0].textContent = getPhrase(hours, minutes)   
    }    
}

const getPhrase = (hours, minutes)=>{
    const phrase = ['Es hora de descansar. Apaga y sigue mañana','Buenos días, desayuna fuerte y a darle al código','Echa un rato más pero no olvides comer', 'Espero que hayas comido','Buenas tardes, el último empujón','Esto ya son horas extras, ... piensa en parar pronto','Buenas noches, es hora de pensar en parar y descansar']
    const now = `${hours}:${minutes}`
    if (now >= '00:01' && now <= '07:00'){
        return phrase[0]
    }else if (now >= '07:01' && now <= '12:00'){
        return phrase[1]
    }else if (now >= '12:01' && now <= '14:00'){
        return phrase[2]
    }else if (now >= '14:01' && now <= '16:00'){
        return phrase[3]
    }else if (now >= '16:01' && now <= '18:00'){
        return phrase[4]
    }else if (now >= '18:01' && now <= '22:00'){
        return phrase[5]
    }else{
        return phrase[6]
    }      
}

getTime();
const intervalTime = setInterval(getTime,1000);

