//1，基本原型： 计算摄氏度

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }
  // event.target基于冒泡理论，event.target永远不变，不被冒泡
  handleChange(e) {
    this.setState({value: e.target.value}); 
  }
  // parseFloat()方法：小数点数字；
  // parseInt()方法：整数；
  // Math.round()方法：最近的整数。Math.round(4.2) -> 4
  render() {
    const value = this.state.value;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={value}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(value)} />
      </fieldset>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);




// 2，材料：摄氏度和华氏度两种计算，但无转换和同步

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }
  handleChange(e) {
    this.setState({value: e.target.value})
  }
  render() {
    const value = this.state.value;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={value}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
class Calculator extends React.Component {
  render() {
    return (
      <div>
       <TemperatureInput scale="c" />
       <TemperatureInput scale="f" />
      </div>
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);




// 3，lift state up 最终型：保持两个component同时更新state，计算并同时转换华氏度和摄氏度


const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 /5) + 32;
}
function tryConvert(value, convert) {
  const input = parseFloat(value);
  // Number.isNaN()方法 决定了是否其中的值是NaN
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={value}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
// 要同时改变多个component的state，需在他们共同的最近一个祖先component中设置state。
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }
  handleCelsiusChange(value) {
    this.setState({scale: 'c', value});
  }
  handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }
  render() {
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;
    
    return (
      <div>
        <TemperatureInput 
          scale="c"
          value={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>      
    );
  }
}
ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
