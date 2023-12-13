const timeclass = document.getElementsByClassName('timeclass');
const dateClass= document.getElementsByClassName('dateClass')
const timePhraseClass = document.getElementsByClassName('timePhraseClass');
const weeksDay = ['domingo', 'lunes','martes','miercoles','jueves', 'viernes','sabado']

const getactualPage = ()=>{
    let URLactual = window.location;
    let indexpage;

    URLactual.pathname == '/index.html' ? indexpage = true : indexpage = false;

    return indexpage;

}

const getTime = () =>{
    let today = new Date();
    let seconds = today.getSeconds().toString();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let indexpage = getactualPage();

    if(seconds.length == 1) {seconds = '0'+seconds; }
    if(minutes.length ==1)  {minutes = '0' + minutes; }  
    if(hours.length==1)     {hours = '0' + hours }
    
    timeclass[0].innerHTML = `${hours}:${minutes}:${seconds}`
    dateClass[0].textContent  =`${weeksDay[today.getDay()]}, ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`  
    
    if(!indexpage){ timePhraseClass[0].textContent = getPhrase(hours, minutes)   }
    
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

