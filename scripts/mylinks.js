const btnLinkID = document.getElementById('btnLinkID');
const containeritems = document.getElementById('containeritems');
console.log(containeritems)


const deletelink = (value)=>{
    let listlinks = JSON.parse(localStorage.getItem('savedlinks'))
    let newList = [];
    for (let i in listlinks){
        if(i != value){
            newList.push(listlinks[i])
        }
    }
    localStorage.setItem('savedlinks', JSON.stringify(newList))
    printlinks()
}

const printlinks = () =>{
    let listlinks = JSON.parse(localStorage.getItem('savedlinks'))
    if (listlinks!= null){
        containeritems.innerHTML ='';
        listlinks.forEach((item,i) => {
        const {link, name} = item;
       
        containeritems.innerHTML += ` 
            <div class="itemclass" ><a href="${link}" target="_blank">${name}</a> 
            <div class="deleteItem" value="${i}">x</div>   
            </div>       
        `;
               
    });
    const deleteItems= document.querySelectorAll('.deleteItem');
    deleteItems.forEach((item)=>{
        item.addEventListener('click', ()=>{
            let valueitem = item.getAttribute('value');
            deletelink(valueitem);
        })

    })

    }
    
}

btnLinkID.addEventListener('click', ()=>{
    const inputNameID = document.getElementById('inputNameID').value;
    const inputLinkID = document.getElementById('inputLinkID').value;
    let listlinks = JSON.parse(localStorage.getItem('savedlinks'))
    
    if (inputLinkID !='' && inputNameID !=''){
        
        const newlink = {
            name: inputNameID,
            link: inputLinkID
        }
        
        listlinks == null ? listlinks = [newlink] : listlinks.push(newlink)
        
        localStorage.setItem('savedlinks', JSON.stringify(listlinks))

        
    }  
    printlinks();
  
})

printlinks();