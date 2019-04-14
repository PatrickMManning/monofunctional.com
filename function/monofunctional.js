class MonoFunction {
	constructor(name, info, description, references, output, funName, fun, inputType, inputFun) {
		this.name = name;
		this.info = info;
		this.description = description;
		this.references = references;
		this.output = output;
		this.funName = funName;
		this.fun = fun;
		this.inputType = inputType;
		this.inputFun = inputFun;
		this.listReferences = this.references.map((el) =>
			`<div><a href="${el}" target="_blank">${el}</a></div>`
		).join('');
		this.generateHtml = function() {
			return (
				`<h1>${this.name}</h1>
				<div>${this.info}</div>
				<br/>
				<form ${this.inputFun}="x.value=${this.fun}(a)">
					<input type="${this.inputType}" id="a">
					<br/>
					<output name="x" for="a"><br/></output>
				</form>
				<br/>
				<div>
					<h2>Description</h2>
					<div>${this.description}</div>
				</div>
				<br/>
				<div>
					<h2>References</h2>
					${decodeURI(this.listReferences)}
				</div>`
			);
		};
		this.generateTitle = function() {
			return (
				`monofunctional - ${monofunction.funName} - ${monofunction.info}`
			);
		}
	}
}
class Abs extends MonoFunction {
	constructor(){
		const name = 'Absolute Value';
		const info = 'Converts the input to the absolute value of that input.';
		const description = 'The output will always be positive.';
		const references = ['https://en.wikipedia.org/wiki/Absolute_value'];
		const output = '';
		const inputType = "number";
		const inputFun = "oninput";
		const funName = 'abs';
		const fun = function(input) {
			const value = parseFloat(input.valueAsNumber);
			if(value >= 0){
				return value;
			} else {
				return -1 * value;
			}
		};
		
		super(name, info, description, references, output, funName, fun, inputType, inputFun);
	}
}
class Bin2Dec extends MonoFunction {
	constructor(){
		const name = 'Binary to Decimal';
		const info = 'Converts a binary input to its decimal value.';
		const description = "Enter a binary number (only 1's and 0's) and it will be converted to decimal.  This does not handle negative binary.  Any input after a second decimal point is ignored.";
		const references = ['https://en.wikipedia.org/wiki/Binary_number','https://en.wikipedia.org/wiki/Two%27s_complement'];
		const output = '';
		const inputType = 'text';
		const inputFun = "oninput";
		const funName = 'bin2dec';
		const fun = function(input) {
			const inString = input.value.toString();
			if(inString === ''){
				return '';
			}
			if(inString.includes('.')){
				ins = inString.split('.');
				decIn = ins[0];
				var out = 0;
				for(var i = decIn.length - 1; i >= 0; i--){
					const val = parseInt(decIn.charAt(i));
					if(val != 0 && val != 1){
						out = NaN;
						break;
					}
					out += Math.pow(2,decIn.length - 1 - i) * val;
				}
				pointIn = ins[1];
				var pointOut = 0;
				for(var i = pointIn.length - 1; i >= 0; i--){
					const val = parseInt(pointIn.charAt(i));
					if(val != 0 && val != 1){
						pointOut = NaN;
						break;
					}
					pointOut += Math.pow(2,pointIn.length - 1 - i) * val;
				}
				return out+'.'+pointOut;
			} else {
				var out = 0;
				for(var i = inString.length - 1; i >= 0; i--){
					const val = parseInt(inString.charAt(i));
					if(val != 0 && val != 1){
						out = NaN;
						break;
					}
					out += Math.pow(2,inString.length - 1 - i) * val;
				}
				return out;
			}
		};
		
		super(name, info, description, references, output, funName, fun, inputType, inputFun);
	}
}
function negdec2bin(input){
	if(parseInt(input) < Math.pow(-2,31)){
		return 'Value too small';
	}
	input = input.substring(1);
	var out = dec2bin(input);
	if(isNaN(out)){
		return out;
	}
	for(var i = 0; i < out.length; i++){
		if(out.charAt(i) == '0'){
			out = out.substring(0,i) + '1' + out.substring(i+1);
		} else {
			out = out.substring(0,i) + '0' + out.substring(i+1);
		}
	}
	for(var i = out.length; i <= 32; i++){
		out = '1' + out;
	}
	var carry = 1;
	for(var i=32; i>=0; i--){
		if(out.charAt(i) == 0 && carry==1){
			out = out.substring(0,i) + 1 + out.substring(i+1);
			break;
		} else if (carry==0){
			break;
		} else if (out.charAt(i) == 1 && carry==1){
			out = out.substring(0,i) + 0 + out.substring(i+1);
		}
	}
	return out;
}
function dec2bin(input){
	if(input.charAt(0)=='-'){
		return negdec2bin(input);
	}
	var out = '';
	var val = parseInt(input);
	if(val > Math.pow(2,31)){
		return 'Value too large';
	}
	do{
		const remainder = val % 2;
		out = remainder + out;
		val = ~~(val/2);
	}while(val != 0)
	if(isNaN(out)){
		out = 'NaN';
	}
	return out;
}
class Dec2Bin extends MonoFunction {
	constructor(){
		const name = 'Decimal to Binary';
		const info = 'Converts a decimal input to its binary value.';
		const description = "Enter a decimal integer and it will be converted to binary.  Max decimal value is 2^31 or about 2 billion.  Negative numbers are represented in 32-bit two's compliment";
		const references = ['http://monofunctional.com/function/bin2dec.html','https://en.wikipedia.org/wiki/Decimal','https://en.wikipedia.org/wiki/Binary_number', 'https://en.wikipedia.org/wiki/Two%27s_complement'];
		const output = '';
		const inputType = 'text';
		const inputFun = "oninput";
		const funName = 'dec2bin';
		const fun = function(input) {
			const inString = input.value.toString();
			if(inString === ''){
				return '';
			}
			if(inString.includes('.')){
				ins = inString.split('.');
				var out = '';
				for(var i = 0; i < ins.length; i++){
					if(i != ins.length - 1){
						out += dec2bin(ins[i]) + '.';
					} else {
						out += dec2bin(ins[i]);
					}
				}
				return out;
			} else {
				return dec2bin(inString);
			}
		};
		
		super(name, info, description, references, output, funName, fun, inputType, inputFun);
	}
}

function isValidHexChar(input) {
	const validHexChars = new Set(['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']);
	return validHexChars.has(input);
}
function isValidHex(input) {
	input = input.toUpperCase();
	for(var i = 0; i < input.length; i++){
		if(!isValidHexChar(input.charAt(i))){
			return false;
		}
	}
	return true;
}

class Hex2Rgb extends MonoFunction {
	constructor(){
		const name = 'Hex to RGB';
		const info = 'Converts a hexadecimal color code input to RGB.';
		const description = "Enter a hexadecimal color code and it will be converted to RGB.  Enter a hex triplet for shortened format to RGB and 4 characters to RGBA.  Enter 6 characters for Hex to RGB, or 8 for conversion to RGBA.";
		const references = ['http://monofunctional.com/function/rgb2hex.html', 'https://en.wikipedia.org/wiki/Web_colors','https://en.wikipedia.org/wiki/Hexadecimal', 'https://en.wikipedia.org/wiki/RGB_color_model'];
		const output = '';
		const inputType = 'text';
		const inputFun = "oninput";
		const funName = 'hex2rgb';
		const fun = function(input) {
			const inString = input.value.toString().trim().toUpperCase().replace('#','');
			if(inString === ''){
				return '';
			}
			if(!isValidHex(inString)){
				return 'Invalid input character. Not a hex digit.';
			}
			
			switch(inString.length) {
				case 3:
					return '' + parseInt(inString.substring(0,1)+inString.substring(0,1),16).toString() + ', ' + parseInt(inString.substring(1,2)+inString.substring(1,2),16).toString() + ', ' + parseInt(inString.substring(2,3)+inString.substring(2,3),16).toString();
				case 4:
					return '' + parseInt(inString.substring(0,1)+inString.substring(0,1),16).toString() + ', ' + parseInt(inString.substring(1,2)+inString.substring(1,2),16).toString() + ', ' + parseInt(inString.substring(2,3)+inString.substring(2,3),16).toString() + ', ' + parseInt(inString.substring(3,4)+inString.substring(3,4),16).toString();
				case 6:
					return '' + parseInt(inString.substring(0,2),16).toString() + ', ' + parseInt(inString.substring(2,4),16).toString() + ', ' + parseInt(inString.substring(4,6),16).toString();
				case 8:
					return '' + parseInt(inString.substring(0,2),16).toString() + ', ' + parseInt(inString.substring(2,4),16).toString() + ', ' + parseInt(inString.substring(4,6),16).toString() + ', ' + parseInt(inString.substring(6,8),16).toString();
				default:
					return 'Invalid input length.  Please enter 3, 4, 6, or 8 hex characters.';
			}
		};
		
		super(name, info, description, references, output, funName, fun, inputType, inputFun);
	}
}

class Rgb2Hex extends MonoFunction {
	constructor(){
		const name = 'RGB to Hex';
		const info = 'Converts an RGB input to a hexadecimal color code.';
		const description = "Enter a space or comma-separated RGB triplet (or quadruplet for RGBa) and it will be converted to a hexidecimal color code.";
		const references = ['http://monofunctional.com/function/hex2rgb.html', 'https://en.wikipedia.org/wiki/Web_colors','https://en.wikipedia.org/wiki/Hexadecimal', 'https://en.wikipedia.org/wiki/RGB_color_model'];
		const output = '';
		const inputType = 'text';
		const inputFun = "oninput";
		const funName = 'rgb2hex';
		const fun = function(input) {
			const inString = input.value.toString().trim();
			if(inString === ''){
				return '';
			}
			const rgbs = inString.match(/(^|\b)[0-2]?[0-9]{1,2}($|\b)/g);
			if(rgbs == null || rgbs.length !== 3 && rgbs.length !== 4){
				return 'Invalid input.  Please enter RGB as 3 or 4 space or comma-separated integers between 0 and 255 (e.g. 190,239,66).';
			}
			let outString = '#';
			for(const rgbVal of rgbs) {
				outString += ('0' + parseInt(rgbVal, 10).toString(16).toUpperCase()).slice(-2);
			}
			return outString;
		};
		
		super(name, info, description, references, output, funName, fun, inputType, inputFun);
	}
}