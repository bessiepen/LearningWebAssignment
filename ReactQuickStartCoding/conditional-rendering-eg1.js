class LoginControl extends React.Component {
  // 2，初始化this.state，绑定
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};  
  }
  // 3.1.1.2 改变了state状态，使isLoggedIn: true
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  // 3.1.2.2 改变了state状态，使isLoggedIn: false
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  // 3，显示渲染内容
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    // 3.1 条件从句筛选判定
    let button = null;
    if (isLoggedIn) {
      // 3.1.2 isLoggedIn为true,引用LogoutButton，props.onClick={this.handleLogoutClick}
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      // 3.1.1 isLoggedIn为false，引用LoginButton，props.onClick={this.handleLoginClick}
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    // 3.2 根据条件判定来显示结果，引用Greeting，显示button
    return (
      <div> 
        <Greeting isLoggedIn={isLoggedIn} /> 
        {button}
      </div>
    ); 
  }
}
// 5.1
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
// 5.2
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
// 4，引用Greeting
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  // 5，根据条件判定显示UserGreeting 还是GuestGreeting
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
// 3.1.2.1 button的click事件为{this.handleLogoutClick}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
// 3.1.1.1 button的click事件为{this.handleLoginClick}
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
ReactDOM.render(
  <LoginControl />, // 1 调用LoginControl
  document.getElementById('root')
);
