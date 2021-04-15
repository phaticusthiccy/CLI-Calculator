var readline = require("readline"),
	CalculatorMono = require("./calcmono"),
	CalculatorDi = require("./calcdi");


var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.setPrompt('? ');
rl.prompt();

var debug = (process.argv.slice(2).indexOf('-debug') > -1);
var env = {}; 

rl.on('line', function (line) {
	try {
		var tokens = new CalculatorMono(line.trim()).tokenize();
		if (debug) {
			console.log("=> ", new CalculatorDi(tokens, env).parse());
		}
		console.log("=> ", CalculatorDi.evaluate(tokens, env));
	} catch (e) {
		console.log("Hata!: \n\n", e);
	}
	rl.prompt();
}).on('SIGINT', function () {
	rl.close();
}).on('close', function () {
	console.log('Görüşmek Üzere :)');
	process.exit(0);
});
