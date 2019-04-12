
// document.getElementById('table').addEventListener('click', firstNumber)
// function firstNumber(event){
//     var x;
//     x = event.target.innerText;
//     console.log(x)
// }

// function to display output
function displayOutput(num){
    document.getElementById('output-value').innerText = num;
}
//function to get Output value
function getOutput(){
    return document.getElementById('output-value').innerText;
}
// function to display history
function displayHistory(num){
    document.getElementById('history-value').innerText = num;
}
// function to get history value
function getHistory(){
    return document.getElementById('history-value').innerText;
}
//function to concatenate numbers in output
var number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function(){
        displayOutput(getOutput() + this.id)
    })
    
}
//function to handle operators
var operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(){
        if(this.id == 'clear'){
            displayHistory('')
            displayOutput('')
        }else if(this.id == 'backspace'){
            var output = getOutput()
            displayOutput(output.substr(0 ,output.length-1 ))
        }else{
            var history = getHistory();
            var output = getOutput();
            if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
            if(output != '' || history != ''){
                if(this.id == '='){
                    var result = eval(history + output)
                    displayHistory('')
                    displayOutput(result)
                }else{
                    history = output + this.id;
                    displayHistory(history)
                    displayOutput('')
                }
            }
            

        }

    })
    
}

