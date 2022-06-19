import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import AllNews from './components/AllNews'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  setProgress = progress=>{
    this.setState({
      progress: progress
    })
  }
  constructor(){
    super();
    this.state={
      pageSize: 12,
      progress: 0
    }
  }
  render() {
    return (
      <div >
        <Router>
          <Navbar/>
          <LoadingBar
            color='#c8b6ff'
            progress={this.state.progress}
            onLoaderFinished={() => this.setState({progress: 0})}
            height='0.2vh'
          />
          <Routes>
            <Route exact path="/monkeyNews" element={<AllNews apiKey={this.apiKey}/>}></Route>
            <Route exact path="/newsMonkey" element={<News apiKey={this.apiKey} key="general" pageSize={this.state.pageSize} setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/business" element={<News apiKey={this.apiKey} key="business" pageSize={this.state.pageSize} category="business" setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/entertainment" element={<News apiKey={this.apiKey} key="entertainment" pageSize={this.state.pageSize} category="entertainment" setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/health" element={<News apiKey={this.apiKey} key="health" pageSize={this.state.pageSize} category="health" setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/science" element={<News apiKey={this.apiKey} key="science" pageSize={this.state.pageSize} category="science" setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/sports" element={<News apiKey={this.apiKey} key="sports" pageSize={this.state.pageSize} category="sports" setProgress={this.setProgress}/>}/>
            <Route exact path="/newsMonkey/technology" element={<News apiKey={this.apiKey} key="technology" pageSize={this.state.pageSize} category="technology" setProgress={this.setProgress}/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}