
let arrNumb = [];
let currentVal = [0];
let Operator = []; 
let isDone = false, isOperator = false;
let input ;
const button = (classes = '',value=null,func=()=>{},type = button,disabled = false)=>{
  if(type == 'button')
    return `<button class="btn ${classes}" value=${value} onclick="${func}">${value}</button>`
  else if(type === 'input')
    return `<input type="text" class="input ${classes}" id="input" value="${value}" ${disabled?`disabled`:''} />`
  else{
    return `<button class="btn" value="1" onclick="()=>{}">Button</button>`
  }
}
const buttonInfo = [
  {
    classes:'',
    value: 0,
    func: `onButton(value)`,
    type: 'input',
    disabled: true
  },
  {
    classes:'clear-btn',
    value: 'C',
    func: `onClear()`,
    type: 'button'
  },
  {
    classes:'',
    value: 1,
    func: `onButton(value)`,
    type: 'button'
  }
  ,
  {
    classes:'',
    value: 2,
    func: `onButton(value)`,
    type: 'button'
  },
  ,
  {
    classes:'',
    value: 3,
    func: `onButton(value)`,
    type: 'button'
  },
  ,
  {
    classes:'increase-btn',
    value: '+',
    func: `onOperator(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 4,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 5,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 6,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'decrease-btn',
    value: '-',
    func: `onOperator(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 7,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 8,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 9,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'multiplication-btn',
    value: '*',
    func: `onOperator(value)`,
    type: 'button'
  },
  {
    classes:'divide',
    value: '/',
    func: `onOperator(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: 0,
    func: `onButton(value)`,
    type: 'button'
  },
  {
    classes:'',
    value: '.',
    func: `onOperator(value)`,
    type: 'button'
  },
  {
    classes:'result',
    value: '=',
    func: `onResult(value)`,
    type: 'button'
  },
]
function renderButton(arr){
  const area = document.getElementById('calcArea');
  const render = []
  // console.log(arr)
  arr.forEach(element => {
    // console.log(element)
    render.push(button(element.classes,element.value,element.func,element.type,element.disabled))
  });
  // console.log(render)
  area.innerHTML = render.join('')
}
renderButton(buttonInfo)
input = document.getElementById("input");



// Thực hiện nhân chia trước rồi đưa vào mảng
function multi() {
  const finded = [];
  for (let i = 0; i < Operator.length; i++) {
    if (Operator[i].toString() === "*" || Operator[i].toString() === "/") {
      finded.push(i);
    }
  }
  if (finded.length > 0) {
    let pos = finded.shift();
    let count = 0;
    for (let i = 0; i < arrNumb.length; i++) {
      if (i === pos) {
        //   console.log("Run", i, pos);
        if (Operator[i].toString() === "*") arrNumb[i] *= arrNumb[i + 1];
        if (Operator[i].toString() === "/") arrNumb[i] /= arrNumb[i + 1];
        arrNumb.splice(i + 1, 1);
        Operator.splice(pos, 1);
        count++;
        if (finded.length > 0) {
          pos = finded.shift() - count;
        } else {
          pos = null;
        }
        i = i - 1;
      }
    }
  }
}

function onButton(value) {
  console.log(value)
  isOperator = false;
  if (isDone) {
    isDone = false;
    onClear();
  }
    if (input.value === "0") {
      input.value = "";
      arrNumb = [];
    }
    input.value += value;
    currentVal.push(value);
    //   console.log("arrNumb = ", arrNumb, "currentVal = ", currentVal);
  // console.log(currentVal.join(''));
}

// Thực hiện tính toán
function calculator() {
  multi();
  const result = arrNumb.reduce((preVal, currVal) => {
    let newVal;
    // Thực hiện phép tính 2 số tương ứng với mỗi phép đã lưu trong mảng
    if (Operator.length > 0) {
      let optHead = Operator.shift();
      if (optHead.toString() === "+") {
        newVal = preVal + currVal;
      } 
      // else if (optHead.toString() === "/") {
      //   newVal = preVal / currVal;
      // } else if (optHead.toString() === "*") {
      //   newVal = preVal * currVal;
      // }
    }
      // console.log('calculator:',preVal, currVal, newVal);
    return newVal;
  });
  if(result.toString() === 'Infinity'){
    onClear();
    alert('Ko chia được cho 0!');
  }else{
    arrNumb = [result];
    input.value = result;
  }
}
// Đưa các phép tính sau khi đã nhập vào cùng một mảng
function onOperator(value) {
  let notrender = true;
  if (value === "." && isDone) {
    return;
  }
  if (!isOperator) {
    
    isDone = false;
    if (value.toString() != "" && value.toString() != ".") {
      if (Number(currentVal.join("")))
        arrNumb.push(Number(currentVal.join("")));
      if(currentVal.join("") === '0')
        arrNumb.push(Number(currentVal.join("")));
      currentVal = [];
      if (value != "-") Operator.push(value);
    }
    if (value === "." && Number(currentVal.join(""))%1 === 0) {
      currentVal.push(value);
    }else if(value === "." ){
      notrender = false;
    }
    if (value === "-") {
      currentVal.push("-");
      Operator.push("+");
    }
    if(notrender)
      input.value += value;
    console.log(
      "arrNumb = ",arrNumb,
      "currentVal = ",currentVal,
      "operator = ",Operator
    );
  }else{
    if (value === ".") {
      if(currentVal.slice(-1) != '.' && Number(currentVal.join(""))%1 === 0  || currentVal.join('').toString()==='-'){
        currentVal.push('0','.');
        input.value += '0.';
      }
    }else{
      Operator.splice(-1,1);
      isOperator = false;
      onOperator(value)
      const arr = Array.from(input.value)
      arr.splice(-2,1)
      input.value = arr.join('')
    }
    // console.log(
    //   "arrNumb = ",arrNumb,
    //   "currentVal = ",currentVal,
    //   "operator = ",Operator
    // );
  }
  isOperator = true;
}
// Làm sạch nội dung đã nhập
function onClear() {
  input.value = 0;
  currentVal = [0];
  arrNumb = [];
  Operator = [];
}
// hàm hiển thị kết quả
function onResult() {
  if (input.value && Operator.length > 0) {
    isDone = true;
    isOperator = false;
    arrNumb.push(Number(currentVal.join("")));
    currentVal = [];
    calculator();
    console.log(
      "arrNumb = ",arrNumb,
      "currentVal = ",currentVal,
      "operator = ",Operator
    );
  }
}
