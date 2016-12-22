// Handling events in HTML eg1 : onclick string
<button onclick="activateLasers()">
  Activate Lasers
</button>

// Handling events in React eg1 : onClick function
<button onClick={activateLasers}>
  Activate Lasers
</button>

// Handling events in HTML eg2 : return false
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>

// Handling events in React eg2 : e.preventDefault()
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}

// React eg: event handler with class

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
