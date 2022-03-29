let coef = 1.2
let gender = document.querySelector('.button__selection_active').value;
let genderbtn = document.querySelectorAll('.button__selection');
let age = document.querySelector('.age__input')
let height = document.querySelector('.height__input')
let weight = document.querySelector('.weight__input')
let calculatebtn = document.querySelector('.calculate-button__getResult')
let phyActivity = document.querySelectorAll('.physical-activity__input input')
let inputs = document.querySelectorAll('.params input')
let reset = document.querySelector('.calculate-button__reset')
let resultBlock = document.querySelector('.result')

let resultHold = document.querySelector('.calorie-results__hold p')
let resultDrop = document.querySelector('.calorie-results__drop p')
let resultBoost = document.querySelector('.calorie-results__boost p')



//Обработка выбора пола
    //Переделать под инпуты вместо кнопок
genderbtn.forEach(item => {
    item.addEventListener('click', () => {
      let cur = document.querySelector('.button__selection_active')
      cur.classList.remove('button__selection_active')
      item.classList.add('button__selection_active')
      gender = item.value
    })
  }
)

//Обработка input radio
phyActivity.forEach(item => {
  item.addEventListener('change', () => {
    if(item.checked){
      coef = item.value
    }
  })
  }
)

//Обраотка результата
calculatebtn.addEventListener('click', CalculateResult)

inputs.forEach(item => {
  item.addEventListener('keyup', activeBtnResult)
  item.addEventListener('keyup', activeBtnReset)
})

reset.addEventListener('click', clearParams)


//Расчет каллорий
function calculateCalories (gender) {
  if(gender === "Мужчина") return Math.ceil(((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5) * coef);
  else if(gender === "Женщина") return Math.ceil(((10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161) * coef);
}

//Активация кнопки рассчета
function activeBtnResult () {
  if(age.value != 0 && height.value != 0 && weight.value != 0){
    calculatebtn.classList.add('calculate-button__getResult_active')
    calculatebtn.removeAttribute('disabled')
  } else calculatebtn.classList.remove('calculate-button__getResult_active')
}

function activeBtnReset () {
  if(age.value != 0 || height.value != 0 || weight.value != 0){
    reset.classList.add('calculate-button__reset_active')
    reset.removeAttribute('disabled')
  } else reset.classList.remove('calculate-button__reset_active')
}

function clearParams () {
  inputs.forEach(item => item.value = '')

  reset.classList.remove('calculate-button__reset_active')
  reset.setAttribute('disabled', true)
  calculatebtn.classList.remove('calculate-button__getResult_active')
  calculatebtn.setAttribute('disabled', true)

  resultBlock.classList.add('visible')
}

function CalculateResult () {
  resultHold.innerHTML = `<b>${calculateCalories(gender)}</b><br> ккал поддержание веса`
  resultDrop.innerHTML = `<b>${calculateCalories(gender) - (calculateCalories(gender) * 0.15)}</b><br> ккал снижение веса`
  resultBoost.innerHTML = `<b>${calculateCalories(gender) + (calculateCalories(gender) * 0.15)}</b><br> ккал набор веса`
  resultBlock.classList.remove('visible')
}

