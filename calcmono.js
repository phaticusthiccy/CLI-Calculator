
var EOF = -1;

function CalculatorMono(input) {
    this.input = input;
    this.c = input[0];
    this.p = 0;
}

CalculatorMono.prototype.tokenize = function () {

    var tokens = [];	

    for (var t = this.nextToken(); t !== EOF; t = this.nextToken()) {
	tokens.push(t)
    }

    return tokens;
}

CalculatorMono.prototype.nextToken = function () {
    while (this.c !== EOF) {
	if (/\s/.test(this.c)) {
	    this.consume(); continue;
        }
	else if (['(', ')', '+', '/', ',', '='].indexOf(this.c) > -1) {
	    return this.symbol();
        }
	else if (this.c === '*') {
	    this.consume();
	    if (this.c === '*') {
		this.consume();
		return '**';
            }
	} 
        else {
	    return '*';
	}
	else if (this.c === '-') {
	    if (this.isNumber(this.input[this.p + 1])) {
	        // Negatif Sayılar için Gerekli Bölüm
	        return this.number();
            }
	}
        else {
	    return '-';
	}
	else if (this.isNumber(this.c)) {
	    return this.number();
	}
        else if (this.isCharacter(this.c)) {
	    return this.functionOrVariableName();
	} 
        else {
	    throw 'İşlem Yapılamaz!: \n\n' + this.c;
	}

	return EOF;
    }
}

CalculatorMono.prototype.isCharacter = function (c) {
    return /^[a-z]$/.test(c);
}

CalculatorMono.prototype.isNumber = function (d) {
    return /^[0-9.]$/.test(d);
}

CalculatorMono.prototype.symbol = function () {
    var c = this.c;
    this.consume();
    return c;
}

CalculatorMono.prototype.number = function () {
    var result = [];
    // Negatif Sayılar için Bir Bölüm Daha
    if (this.c === '-') {
	result.push('-');
	this.consume();
    }

    do {
	result.push(this.c);
	this.consume();
    }
    while (this.c === '.' || this.isNumber(this.c));

    var numStr = result.join('');

    if (/^.*\..*\..*$/.test(numStr)) {
	throw 'Geçersiz Sayı!: \n\n' + numStr;
    }
    return numStr;
}

CalculatorMono.prototype.functionOrVariableName = function () {
    var result = [];
    do {
	result.push(this.c);
	this.consume();
    } 
    while (this.isCharacter(this.c));

    return result.join('');
}

CalculatorMono.prototype.consume = function () {
    this.p++;
    if (this.p < this.input.length) {
        this.c = this.input[this.p];
    }
    else { 
        this.c = EOF;
    }
}

module.exports = CalculatorMono;
