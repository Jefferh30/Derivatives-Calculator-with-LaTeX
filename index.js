//Display main input field using MathQuill
const MQ = MathQuill.getInterface(2);
const inputSpan = document.getElementById('inputField');
let answerMathField = MQ.MathField(inputSpan, {
    spaceBehavesLikeTab: true,
    handlers: {
      edit: function() {
        answerMathField.focus();}}});

//render keypad in LaTeX
let padBtns = document.getElementsByClassName("keypad-btn");

for (let i = 0; i < padBtns.length; i++) {
  MQ.StaticMath(padBtns[i]);
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
function deriveBtn(){
    let variableIn = document.getElementById("input2").value.toLowerCase();
    let input1 = answerMathField.latex();
    let equationIn0 = nerdamer.convertFromLaTeX(input1);
    let equationIn = nerdamer.convertFromLaTeX(input1).toString();
    let variablesIn =  nerdamer(equationIn).variables();
  //condition to ask for variable  
  if(variablesIn.length == 1){variableIn = variablesIn[0]; 
                              executeSolution();
                             document.getElementById("second-input").style.display = "none";} else if(variablesIn.length > 1 && variableIn == ""){
      document.getElementById("second-input").style.display = "grid"; 
    } else{executeSolution();
          document.getElementById("second-input").style.display = "none";}
    
 function executeSolution() {  
    let solution = nerdamer('diff('+ equationIn + ',' + variableIn + ')');                             
    let solution2 = solution.toTeX();
    let solution3 = solution2.replace(/\\cdot/g,'');
    let solutionFinal = `<span id="answerFinal">f'(${variableIn})=${solution3}</span>`;
   
   document.getElementById("result1").innerHTML = `<p style="text-align:center; font-size:21px; width: 100%;" class="manySolutions">${solutionFinal}</p>`;  
                             
    let answerFinal = document.getElementById("answerFinal");
   MQ.StaticMath(answerFinal);  
    //Clear all expression to avoid creating new ones when clicking
    nerdamer.flush();
}}

 //Clear everything on click
  
  function clearValues(){
      answerMathField.latex("");
      document.getElementById("input2").value = "";
      document.getElementById("result1").innerHTML = "-";
      document.getElementById("result1").innerHTML = "-";
      document.getElementById("second-input").style.display = "none";
      }
