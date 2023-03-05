//Display main input field using MathQuill
let answerMathField;
let MQ

const startMathQuill = () => {
  MQ = MathQuill.getInterface(2);
  const inputSpan = document.getElementById('inputField');
  answerMathField = MQ.MathField(inputSpan, {
      spaceBehavesLikeTab: true,
      handlers: {
        edit: function() {
          answerMathField.focus();}}});

  //render keypad in LaTeX
  const padBtns = document.getElementsByClassName("keypad-btn");

  for (let i = 0; i < padBtns.length; i++) {
    MQ.StaticMath(padBtns[i]);
  }
}


//functions for keypad and LaTeX
const latexK = {
  squared: function(){answerMathField.write("x^2");answerMathField.focus();},
  nPower: function(){answerMathField.write("x^n"); answerMathField.focus();},
  squareR: function(){answerMathField.cmd("\\sqrt"); answerMathField.focus();},
  nRoot: function(){answerMathField.write("\\sqrt[n] x"); answerMathField.focus();},
  times: function(){answerMathField.typedText("\\cdot "); answerMathField.focus();},
  fraction: function(){answerMathField.cmd("\\frac"); answerMathField.focus();},
  sine: function(){answerMathField.write("\\sin(x)"); answerMathField.focus();},
  cosine: function(){answerMathField.write("\\cos(x)"); answerMathField.focus();},
  tangent: function(){answerMathField.write("\\tan(x)"); answerMathField.focus();},
  secant: function(){answerMathField.write("\\sec(x)"); answerMathField.focus();},
  naturalLog: function(){answerMathField.write("\\log(x)"); answerMathField.focus();},
}

// Function that activates on click, derive function
const deriveBtn = () => {
    let variableIn = document.getElementById("input2").value.toLowerCase();
    const input1 = answerMathField.latex();
    const equationIn = nerdamer.convertFromLaTeX(input1).toString();
    const variablesIn =  nerdamer(equationIn).variables();
    
  // helper function to find solution
  const executeSolution = () => {  
    const solution = nerdamer('diff('+ equationIn + ',' + variableIn + ')');                             
    const solution2 = solution.toTeX();
    const solution3 = solution2.replace(/\\cdot/g,'');
    const solutionFinal = `<span id="answerFinal">f'(${variableIn})=${solution3}</span>`;
   
   document.getElementById("result1").innerHTML = `<p style="text-align:center; font-size:21px; width: 100%;" class="manySolutions">${solutionFinal}</p>`;  
                             
    let answerFinal = document.getElementById("answerFinal");
   MQ.StaticMath(answerFinal);  
    //Clear all expression to avoid creating new ones when clicking
    nerdamer.flush();
  }

    //condition to ask for variable  
    if(variablesIn.length == 1){
      variableIn = variablesIn[0]; 
      executeSolution();
      document.getElementById("second-input").style.display = "none";
    } else if (variablesIn.length > 1 && variableIn == "") {
      document.getElementById("second-input").style.display = "grid"; 
      } else {
        executeSolution();
        document.getElementById("second-input").style.display = "none";
      }
}

 //Clear everything on click
  
  const clearValues = () => {
      answerMathField.latex("");
      document.getElementById("input2").value = "";
      document.getElementById("result1").innerHTML = "-";
      document.getElementById("result1").innerHTML = "-";
      document.getElementById("second-input").style.display = "none";
      }
