infoModal = document.querySelector('.info')
function toggleInfo(){
    infoModal.classList.toggle('hidden')
}

let table = document.querySelector('.tableArea')
table.innerHTML = ''

function generateItemTable(items){
    let temp = ''

    let tempHeader = ''

    for(key in items[0]){
        tempHeader += `<th>${key}</th>`
    }


    for(item of items){
        let tempRow = ''
        for(key in item){
            tempRow +=`<td>${item[key]}</td>`
        }
        temp += `<tr>${tempRow}</tr>`
    }

    table.innerHTML += `<table>${tempHeader} ${temp}</table>`

}

generateItemTable(Shopping.food)
generateItemTable(Shopping.mentalCare)