const Pinn = {
    status: "happy",
    hunger: 80,
    health: 80,
    happiness: 80,
    money: 0,
    sick: 1
}

let hungerRunner =
    setInterval(function() {
        let hungerCoeficient = parseInt(Pinn.hunger / 20)
        if(Pinn.hunger === 0) clearInterval(hungerRunner)
        if ([Pinn.hunger, Pinn.health, Pinn.happiness].sort((a, b) => a - b)[0] === 0) dead()
        Pinn.hunger--
        renderStatus()
        if(Pinn.hunger != hungerCoeficient) {renderPinn()}
    }, 1000)
let  happinessRunner =
    setInterval(function() {
        if(Pinn.happiness === 0) clearInterval(happinessRunner)
        Pinn.happiness--
        renderStatus()
    }, 10000 * Pinn.sick)

var healthRunner

var sick = false

function getSick(){
    Pinn.sick = Math.random().toFixed(1)
    console.log(Pinn.sick)
    sick = true
    healthRunner = 
        setInterval(function() {
            if (!sick) {
                clearInterval(healthRunner)
            } else if (sick) {
                if(Pinn.health <= 0) {
                    dead()
                } else {
                    Pinn.health--
                }
            } else {
                console.error('Health Runner error occurred. "Sick" is not a valid value')
            }
            renderStatus()
            }, 5000 * Pinn.sick)
}


//Cosmetics

function Medicine(){
    if(Pinn.money >= 150) {
        Pinn.money -= 150
        Pinn.sick = 1
        sick = false
    }
    moneyHTML.innerText = `Money: ${Pinn.money}`
}

function Food(satiety, quality, price){
    console.log('food function', price, satiety, quality)
    if(Pinn.money >= price) {
        percentageForSick = percentage()
        Pinn.money = Pinn.money - price
        Pinn.hunger += satiety * 5
        switch(quality) {
            case 1:
                if(percentageForSick >= 50) getSick()
                break
            case 2:
                if(percentageForSick >= 25) getSick()
                break
            case 3:
                if(percentageForSick >= 10) getSick()
                break
            default:
                break
        }
    }
    moneyHTML.innerText = `Dinheiro: ${Pinn.money}`
    if(Pinn.hunger > 100){Pinn.hunger = 100}
}

function MentalHealthCare(intensity, price){
    if(Pinn.money >= price) {
        Pinn.money = Pinn.money - price
        Pinn.happiness += intensity * 25
    }
    if(Pinn.happiness > 100){Pinn.happiness = 100}
}

function Cure(){
    if(Pinn.money >= 100){
        Pinn.money = Pinn.money - 100
        Pinn.health += 20
    }
    if(Pinn.health > 100){Pinn.health = 100}
}

// hungerRunner()

const statusArea = document.querySelector('.statusArea')

const hungerBar = document.querySelector('.progress-hunger')
const healthBar = document.querySelector('.progress-health')
const happinessBar = document.querySelector('.progress-happiness')

const timer = document.querySelector('.timer')

// hungerBar.style.witdh

function renderPinn() {
    let pinnHTML = document.querySelector('.pinn')

    const statusList = [
        "dead",
        "bad",
        "unhappy",
        "neutral",
        "happy",
        "extremelyHappy"
    ]

    let statusCoeficient = [Pinn.hunger, Pinn.health, Pinn.happiness].sort((a, b) => a - b)[0]

    if (statusCoeficient <= 0) {
        pinnHTML.innerHTML = '<img src="./images/dead.png" alt="pinn dead"></img>'
    } else if (statusCoeficient <= 20) {
        pinnHTML.innerHTML = '<img src="./images/bad.png" alt="pinn bad"></img>'
    } else if (statusCoeficient <= 40) {
        pinnHTML.innerHTML = '<img src="./images/unhappy.png" alt="pinn unhappy"></img>'
    } else if (statusCoeficient <= 60) {
        pinnHTML.innerHTML = '<img src="./images/neutral.png" alt="pinn neutral"></img>'
    } else if (statusCoeficient <= 80) {
        pinnHTML.innerHTML = '<img src="./images/happy.png" alt="pinn happy"></img>'
    } else if (statusCoeficient <= 100) {
        pinnHTML.innerHTML = '<img src="./images/extremelyHappy.png" alt="pinn extremely happy"></img>'
    }
    
}

function renderStatus() {
    hungerBar.style.width = `${Pinn.hunger}%`
    healthBar.style.width = `${Pinn.health}%`
    happinessBar.style.width = `${Pinn.happiness}%`
}

renderPinn()

let time = 0
let timeRunner = 
    setInterval(function() {
        time++
        timer.innerText = `Tempo de vida: ${beautifyNumber(parseInt(time / 3600))}:${beautifyNumber(parseInt((time % 3600) / 60))}:${beautifyNumber(parseInt(time % 60))}`
    }, 1000)


function beautifyNumber(number){
    if (number < 10) {
        return `0${number}`
    } else {
        return number
    }
}

function dead(){
    clearInterval(timeRunner)
    clearInterval(hungerRunner)
    clearInterval(healthRunner)
    clearInterval(happinessRunner)
    renderPinn()
    alert(`Pinn morreu, seu tempo de sobrevivência foi de ${beautifyNumber(parseInt(time / 3600))}:${beautifyNumber(parseInt((time % 3600) / 60))}:${beautifyNumber(parseInt(time % 60))}`)
}

//capitalism area
let moneyHTML = document.querySelector('.money')




//math challenges

const mathChallengeHTML = document.querySelector('.challengeDescription')
const answerForm = document.querySelector('#answerForm')
const answerInput = document.querySelector('#answerInput')
const lastest = document.querySelector('.lastest')
const lastestElapsedTime = document.querySelector('.lastestElapsedTime')

let reward = 20
let rewardTimer = setInterval(() => {if(reward > 2) {reward = reward -2}}, 1000)

let elapsedTimeHTML = document.querySelector('.elapsedTime')
let elapsedTime = 0
let elapsedTimeInterval = setInterval(() => {
    elapsedTime++
    elapsedTimeHTML.innerText = `Tempo nessa questão: ${elapsedTime} segundos`
}, 1000)


answerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let answer = answerInput.value
    if(Number(answer) === Number(currentAnswer)){
        Pinn.money += reward
        lastest.innerHTML = `<h4 class="correct">Sua última resposta: ${answer} <br> Ultima resposta correta: ${currentAnswer}</h4>`
        console.log(`${mathChallengeHTML.innerText}: ${currentAnswer}`)
    } else {
        lastest.innerHTML = `<h4 class="wrong">Sua última resposta: ${answer} <br> Ultima resposta correta: ${currentAnswer}</h4>`
    }
    moneyHTML.innerText = `Dinheiro: ${Pinn.money}`
    answerInput.value = ''
    generateChallenge()
    reward = 20
    lastestElapsedTime.innerText = `Tempo na última conta: ${elapsedTime} segundos`
    elapsedTime = 0
    elapsedTimeHTML.innerText = `Tempo nessa questão: ${elapsedTime} segundos`
})

function random(maxDigits, float, negative){
    let number
    let digits = parseInt(Math.random() * maxDigits) + 1
    if (float) {
        number = (Math.random() * (10 ** digits)).toFixed(1)
    } else if (!float) {
        number = parseInt(Math.random() * (10 ** digits))
    }
    
    let decision = parseInt(Math.random() + 0.5)

    if (negative){
        if (decision) {
            return number * -1
        } else {
            return number
        }
    } else if (!negative) {
        return number
    }
}

let currentAnswer = ''

function generateChallenge(){
    let difficulty = getDifficulty()
    let float
    let negative
    if(difficulty >= 14){
        float = true
    }
    if (difficulty >= 7){
        negative = true
    }
    
    let firstNumber = random(difficulty, float, negative) + 1
    let operation = choose(
        [
        '+',
        '-',
        '*', 
        // '/'
        ])
    let secondNumber = random(difficulty, float, negative) + 1

    currentAnswer = eval(`${firstNumber} ${operation} ${secondNumber}`)
    mathChallengeHTML.innerText = `${firstNumber} ${operation} ${secondNumber}`

    return `${firstNumber} ${operation} ${secondNumber}`
}




function getDifficulty() {
    return parseInt(time / 60 + 1)
}

function choose(array) {
    return array[parseInt(Math.random() * array.length)]
}

function percentage(){
    return parseInt(Math.random() * 100)
}

generateChallenge()




const Shopping = {
    food: [
        {
            name: 'Pizza',
            quality: '1',
            satiety: '4',
            price: '100',
        },
        {
            name: 'Hamburguer',
            quality: '1',
            satiety: '3',
            price: '75',
        },
        {
            name: 'Abacate',
            quality: '1',
            satiety: '1',
            price: '1',
        },
        {
            name: 'Salada de Frutas',
            quality: '4',
            satiety: '2',
            price: '125',
        },
        {
            name: 'Sorvete',
            quality: '1',
            satiety: '1',
            price: '30',
        },
        {
            name: 'Spaghetti',
            quality: '2',
            satiety: '4',
            price: '100',
        },
        {
            name: 'Queijo',
            quality: '3',
            satiety: '3',
            price: '200',
        }
    ],
    health: [

    ],
    mentalCare: [
        {
            name: 'Psicólogo',
            intensity: '4',
            price: '400'
        },
        {
            name: 'Videogames',
            intensity: '1',
            price: '50'
        },
        {
            name: 'Cinema',
            intensity: '2',
            price: '200'
        },
        {
            name: 'Spa',
            intensity: '3',
            price: '275'
        },
    ],
}
//shopping

function generateShopping(){
    let foodArea = document.querySelector('.food .product-area')
    let healthArea = document.querySelector('.medArea .product-area')
    let mentalHealthArea = document.querySelector('.mentalHealthCare .product-area')
    
    temp = ''
    for(food of Shopping.food){
        temp += `<div class="cosmetic" onclick="Food(${food.satiety}, ${food.quality}, ${food.price})">${food.name} $${food.price}</div>`
    }

    foodArea.innerHTML = temp
    temp = ''

    for(mentalCare of Shopping.mentalCare){
        temp += `<div class="cosmetic" onclick="MentalHealthCare(${mentalCare.intensity}, ${mentalCare.price})">${mentalCare.name} $${mentalCare.price}</div>`
    }

    mentalHealthArea.innerHTML = temp
}

generateShopping()


function toggleShop() {
    let button = document.querySelector('.button-shop')
    let shopping = document.querySelector('.shopping')
    button.classList.toggle('active')
    shopping.classList.toggle('active')
}