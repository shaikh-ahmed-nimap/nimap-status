let prev = document.getElementById('prev-display');
let curr = document.getElementById('curr-display');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal')
let btns = document.querySelectorAll('.btns')

let prevValue;
let currValue;
let currOperator;

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (curr.value !== '' && e.target.value === 'AC') {
      clearAll();
    } else if (curr.value !== '' && e.target.value === 'DEL') {
      deleteOne();
    } else {
      curr.value = curr.value + e.target.value
    }
  })
})

operators.forEach(operator => {
  operator.addEventListener('click', (e) => {
    console.log(currOperator)
    if (prev.value === '') {
      prev.value = curr.value;
      curr.value = '';
    } else {
      calculate(currOperator, prev, curr);
    }
    currOperator = e.target.value
  })
})

equal.addEventListener('click', (e) => {
  if (prev.value === '') {
    curr.value = curr.value
  } else {
    calculate(currOperator, prev, curr)
    curr.value = prev.value
    prev.value = '';
  }
})

function clearAll() {
  prev.value = '';
  curr.value = '';
  currOperator = '';
}

function deleteOne() {
  curr.value = curr.value.slice(0, -1)
}

function calculate (operator, prev, curr) {
  switch(operator) {
    case '+':
      prev.value = Number(prev.value) + Number(curr.value)
      curr.value = ''
      break;
    case '-':
      prev.value = Number(prev.value) - Number(curr.value)
      curr.value = ''
      break;
    case '*':
      console.log(curr.value, prev.value, operator)
      prev.value = Number(prev.value) * Number(curr.value)
      curr.value = ''
      break;
    case '/':
      prev.value = Number(prev.value) / Number(curr.value)
      curr.value = ''
      break;
    default:
      prev.value = Number(prev.value) + Number(curr.value)
      curr.value = ''
      break;
  }
}