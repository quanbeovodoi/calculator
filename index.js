const input = document.getElementById("input");
let arrNumb = [];
let currentVal = [0];
let Operator = []; 
let isDone = false, isOperator = false;
function renderBtn(){

}
function swap(a, b) {
  let temp = a;
  a = b;
  b = temp;
  return [a, b];
}
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
  isOperator = false;
  if (isDone) {
    isDone = false;
    onClear();
  }
  if (input.value != "0" || value != "0") {
    if (input.value === "0") {
      input.value = "";
      arrNumb = [];
    }
    input.value += value;
    currentVal.push(value);
    //   console.log("arrNumb = ", arrNumb, "currentVal = ", currentVal);
  }
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
  if (value === "." && isDone) {
    return;
  }
  if (!isOperator) {
    isDone = false;
    if (value.toString() != "" && value.toString() != ".") {
      if (Number(currentVal.join("")))
        arrNumb.push(Number(currentVal.join("")));
      currentVal = [];
      if (value != "-") Operator.push(value);
    }
    if (value === ".") {
      currentVal.push(value);
    }
    if (value === "-") {
      currentVal.push("-");
      Operator.push("+");
    }
    input.value += value;
    console.log(
      "arrNumb = ",arrNumb,
      "currentVal = ",currentVal,
      "operator = ",Operator
    );
  }else{
    if (value === ".") {
      currentVal.push('0','.');
      input.value += '0.';
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
  currentVal = [];
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
