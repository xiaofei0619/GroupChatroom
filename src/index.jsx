import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { ChatRoom } from './components/ChatRoom';
import { ChatBot } from './components/ChatBot';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  //StrictMode does not render any visible UI. 
  //It activates additional checks and warnings for its descendants. 
  //Note: Strict mode checks are run in development mode only; they do not impact the production build.
  <React.StrictMode> 
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/chatbot">
            <ChatBotWrapper />
          </Route>
          <Route exact path="/">
            <ChatRoomWrapper />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function ChatBotWrapper() {
  //use hook useHistory to perform nevigation from inside component
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <ChatBot backToHome={()=>{
        handleClick();
    }}/>
  );
}

function ChatRoomWrapper() {
  let history = useHistory();
  function handleClick() {
    history.push("/chatbot");
  }
  return (
    <ChatRoom goToChatbot={()=>{
      handleClick();
    }}/>
  );
}
