class MonoFunction {
	constructor(name, info, description, references, output, funName, fun, inputType) {
		this.name = name;
		this.info = info;
		this.description = description;
		this.references = references;
		this.output = output;
		this.funName = funName;
		this.fun = fun;
		this.inputType = inputType;
		this.listReferences = this.references.map((el) =>
			`<div><a href="${el}" target="_blank">${el}</a></div>`
		).join('');
		this.generateHtml = function() {
			return (
				`<h1>${this.name}</h1>
				<div>${this.info}</div>
				<br/>
				<form oninput="x.value=${this.fun}(a)">
					<input type="${this.inputType}" id="a">
					<br/>
					<output name="x" for="a"></output>
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
		const funName = 'abs';
		const fun = function(input) {
			const value = parseFloat(input.valueAsNumber);
			if(value >= 0){
				return value;
			} else {
				return -1 * value;
			}
		};
		
		super(name, info, description, references, output, funName, fun, inputType);
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
		const funName = 'bin2dec';
		const fun = function(input) {
			const inString = input.value.toString();
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
		
		super(name, info, description, references, output, funName, fun, inputType);
	}
}