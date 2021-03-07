function gethistory() {//will return history value
    return document.getElementById('history-value').innerText;
}
function printhistory(num) {//willl print history
    document.getElementById('history-value').innerText = num;
}

function getoutput() {//will return output value
    return document.getElementById('output-value').innerText;
}
function printoutput(num) {//willl print output
    if (num == 0) {
        document.getElementById('output-value').innerText = num
    }
    else {
        document.getElementById('output-value').innerText = getFormattedNumber(num);
    }
    //get formatted number is used to ease readability of output values using commas
}
function getFormattedNumber(num) {
    if (num == "-") {//when we delete -ve value using CE
        return ""
    }
    var n = Number(num);
    var value = n.toLocaleString('en');
    return value;
    //function to create commas
}
//function to remove comma when it gives output
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

//function to operate operations

let operator = document.getElementsByClassName('operator');
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            printhistory("")
            printoutput("")
        }
        else if (this.id == "backspace") {
            //we convert it to a number format so that we dont deal with commas
            var output = reverseNumberFormat(getoutput()).toString();
            if (output) {//if output has a value remove the last character using substr function
                output = output.substr(0, output.length - 1)
                printoutput(output);
            }
        }
        else {//for operators=+,-,*,/,%,=
            var output = getoutput();
            var history = gethistory();
            if (output == "" && history != "") {
                //it is used when we want to change operator sign from history
                if (isNaN(history[history.length - 1])) {
                    //if last character is not a number we will remove it using substr function
                    history = history.substr(0, history.length - 1);
                }
            }
            
            if (output != "" || history != "") {//if history is not empty and output is empty then output is set to empty value

                //it should be converted to a number format only if a output has a value using conditional operator
                output = output == "" ? output : reverseNumberFormat(output)
                //adding the output to history value
                history = history + output;
                if (this.id == "=") {//if we click = operator
                    var result = eval(history);
                    printoutput(result);
                    printhistory("")
                }
                else {//if we click %,/,*,-,+
                    history = history + this.id;
                    printhistory(history);
                    printoutput("")
                }
            }
        }
    })
}
//function to click numbers
let number = document.getElementsByClassName('number');
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        //output for comma removes
        var output = reverseNumberFormat(getoutput());
        if (output != NaN) {//if output is a number
            output += this.id;
            printoutput(output);
        }
    })
}
