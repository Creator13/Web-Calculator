//Global functions
function calculate(numbers, operators) {
	if (! (numbers instanceof Array) || ! (operators instanceof Array)) {
		throw "Invalid action: calculate() parameters must be arrays";
	}
	if ((numbers.length - operators.length) !== 1) {
		throw "Invalid parameters: operator array must be exactly one element smaller than numbers array";
	}
	
	//First handle division and multiplication
	while ($.inArray('×', operators) > -1 || $.inArray('÷', operators) > -1) {
		var index;
		var newNumber;
		var multiIndex = $.inArray('×', operators);
		var divIndex = $.inArray('÷', operators);
		
		if (((divIndex !== -1 && multiIndex !== -1) && divIndex < multiIndex) || (multiIndex === -1 && divIndex > -1)) {
			//Division
			index = $.inArray('÷', operators);
			
			//Calculate the result and replace the first number of the two with it
			newNumber = numbers[index] / numbers[index + 1];
			numbers[index] = newNumber;
			
			//Remove the used elements from the array
			operators.splice(index, 1);
			numbers.splice(index + 1, 1);
		}
		else if (((divIndex !== -1 && multiIndex !== -1) && multiIndex < divIndex) || (divIndex === -1 && multiIndex > -1)) {
			//Multiplication
			index = $.inArray('×', operators);
			
			//Calculate the result and replace the first number of the two with it
			newNumber = numbers[index] * numbers[index + 1];
			numbers[index] = newNumber;
			
			//Remove the used elements from the array
			operators.splice(index, 1);
			numbers.splice(index + 1, 1);
		}
	}
	
	//Now do addition and subtraction
	total = numbers[0];
	for (var i = 0; i < operators.length; i++) {
		if (operators[i] === '+') {
			total += numbers[i + 1];
		}
		else if (operators[i] === '-') {
			total -= numbers[i + 1];
		}
		else {
			throw 'Found unknown character in operator array: ' + operators[i];
		}
	}
	
	showResult(total);
	
}

function showResult(result) {
	showingResult = true;
	console.log(result);
	
	//Obtain DOM objects
	var equitationDiv = $('.lastEquitation');
	var numField = $('.numberField');
	
	//Put the equitation in the lastEquitation field
	equitationDiv.text(numField.val() + " =");
	numField.val(result);
}

//Init vars
//Initialize enum objects
var Types = {number:3001, operator:3002, equals:3003, dot:3004};

//Init other vars
var numbers = [], operators = [];
var lastButtonType;
var redundantString = '';
var dotUsed = false;
var showingResult = false;

//-------------//
//Number Action//
//-------------//
$('.button_standard').click(function() {
	var nf = $('.numberField');
	
	//Check if button is dot, this requires special actions
	if ($(this).attr('id') == 'button_dot') {
		if (dotUsed === false) {
			nf.val(nf.val() + $(this).val());
			
			dotUsed = true;
			lastButtonType = Types.number;
		}
		return;
	}
	
	//Normal number button, so add this number to the text field or add some aesthetics in special cases
	if (lastButtonType === undefined || lastButtonType == Types.number) {
		nf.val(nf.val() + $(this).val());
	}
	else if (lastButtonType == Types.operator) {
		//Add a whitespace between two numbers
		nf.val(nf.val() + ' ');
		nf.val(nf.val() + $(this).val());
	}
	else if (lastButtonType == Types.equals) {
		if (!showingResult) {
			throw 'Invalid state exception';
		}
		
		$('.lastEquitation').text($('.lastEquitation').text() + ' ' + nf.val());
		nf.val('');
		
		nf.val(nf.val() + $(this).val());
		
	}
	else {
		//Error
	}
	
	lastButtonType = Types.number;
});

//---------------//
//Operator Action//
//---------------//
$('.button_operator').click(function() {
	if (lastButtonType === undefined) {
		//Invalid: There must be a number in the beginning
		return;
	}
	else if (lastButtonType == Types.operator) {
		//Code to change last operator
	}
	else if (lastButtonType == Types.equals) {
		//Code to obtain number and start a new calculation with it as a beginning number
	}
	else if (lastButtonType == Types.number) {
		var nf = $('.numberField');
		var value = nf.val();
		
		//Obtain only the last number entered by removing the previous string
		value = value.replace(redundantString, "");
		var currentNumber = parseFloat(value);
		
		//Store number and operator, and the current string
		numbers[numbers.length] = currentNumber;
		operators[operators.length] = $(this).val();
		
		//Concat new string to textfield
		nf.val(nf.val() + ' ' + $(this).val());
		redundantString = nf.val();
		
		lastButtonType = Types.operator;
	}
	
	//Reset dotUsed value to false (dot can be reused in another number)
	dotUsed = false;
	
});

//-------------//
//Equals Action//
//-------------//
$('.button_equals').click(function() {
	if (lastButtonType === undefined || lastButtonType == Types.operator || lastButtonType == Types.equals) {
		//Invalid: can't end with these Types of characters.
		return;
	}
	else if (lastButtonType == Types.number) {
		var nf = $('.numberField');
		var value = nf.val();
		
		//Obtain only the last number entered by removing the previous string
		value = value.replace(redundantString, "");
		var currentNumber = parseFloat(value);
		
		//Store last number
		numbers[numbers.length] = currentNumber;
		
		lastButtonType = Types.equals;
	}
	
	dotUsed = false;
	
	calculate(numbers, operators);
	
	//Clear the arrays
	numbers = [];
	operators = [];
	
});

