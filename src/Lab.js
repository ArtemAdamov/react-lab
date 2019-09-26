import React from 'react';

export const alphabet='АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЬЫЭЮЯ';
const consts={
    e: 'encrypt',
    d: 'decrypt',
};
function encrypt(input, shiftedAlphabet) {
    let encryptedMessage = '';
    for (let i = 0; i < input.length; i++) {
        let indexOfLetter = alphabet.indexOf(input[i].toUpperCase());
        encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
    }
    return encryptedMessage;
}
function decrypt(input, shiftedAlphabet) {
    let encryptedMessage = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === ' ') {
            encryptedMessage = encryptedMessage.concat(' ');
            continue}

        let indexOfLetter = shiftedAlphabet.indexOf(input[i].toUpperCase());
        encryptedMessage = encryptedMessage.concat(alphabet[indexOfLetter]);
    }
    return encryptedMessage;
}
function tryConvert(inputValue, convert, shifted) {
    const shift=shifted;
    const input=inputValue;
    let shiftedAlphabet = '';
    for (let i = 0; i < alphabet.length; i++) {
        let currentLetter = (alphabet[i + shift] === undefined)
            ? (alphabet[i + shift - alphabet.length])
            : (alphabet[i + shift]);

        shiftedAlphabet = shiftedAlphabet.concat(currentLetter);
    }
    if (typeof (input) === 'undefined') {
        return '';
    }
    return convert(input, shiftedAlphabet);
}
class ConvertInput extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onConvertChange(e.target.value);
    }
    render() {
        const inputValue= this.props.inputValue;
        const isEncrypt= this.props.isEncrypt;
        return(
            <fieldset>
                <legend>Enter text to {consts[isEncrypt]}</legend>
                <input value={inputValue}
                       onChange={this.handleChange}/>
            </fieldset>
        );
    }
}
class Converter extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isEncrypt: 'd',
            shift:1
        };
        this.handleEncryptChange= this.handleEncryptChange.bind(this);
        this.handleDecryptChange= this.handleDecryptChange.bind(this);
        this.handleShift= this.handleShift.bind(this);
    }
        handleEncryptChange(inputValue) {
            this.setState({
                isEncrypt: 'e',
                inputValue
            })
        }
        handleDecryptChange(inputValue) {
            this.setState({
                isEncrypt: 'd',
                inputValue
            })
        }
        handleShift(e) {
            let value = +e.target.value;
            this.setState({
                shift:
                    (value > 0 && value < alphabet.length-1)
                        ? value
                        : 1

            });
        }
        render() {
        const isEncrypt= this.state.isEncrypt;
        const inputValue= this.state.inputValue;
        const shift= this.state.shift;

        const caesarEnc= isEncrypt=== 'd' ? tryConvert(inputValue,decrypt,shift): inputValue;
        const caesarDec= isEncrypt=== 'e' ? tryConvert(inputValue,encrypt,shift): inputValue;
        return(
            <div>
                <ConvertInput
                    isEncrypt='e'
                    inputValue={caesarEnc}
                    onConvertChange={this.handleEncryptChange}/>
                <ConvertInput
                    isEncrypt='d'
                    inputValue={caesarDec}
                    onConvertChange={this.handleDecryptChange}/>
                <fieldset>
                    <legend>enter caesar key</legend>
                    <input type="number"
                           value={shift}
                           onChange={this.handleShift}/>
                </fieldset>
            </div>
        )
        }
}
export default Converter;
