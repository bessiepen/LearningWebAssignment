// 无state无props版本

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById(‘root’)
  )；
}

setInterval(tick,1000);

// props版本

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById(‘root’)
  );
}
setInterval(tick, 1000);

// state版本

class Clock extends React.component {
  constructor(props) {  
    super(props); // pass props to the base component
    this.state = {date: new Date()};   // 2 initialize this.state
  }
  
  // Mounting
  componentDidMount() {  // 4 
  
  }
  
  componentWillUnmount() { // 7 if this component is removed, call this to clear
  
  }
  
   tick() {  // 5 
    this.setState({
      date: new Date() // 5.1 current time, setState() change the state, and then
    });
  }
  
  render() {  // 3 display 
    // 6 call the render again to update the UI,
    // this time "this.state.date" is different.
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
     );
  }
}
ReactDOM.render(
  <Clock />,  // 1 
  document.getElementById('root')
);
