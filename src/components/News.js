import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 6
  }
  static propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    apiKey: PropTypes.string.isRequired
  }
  articles= []
  constructor(props) {
    super(props);
    this.state = {
        articles: this.articles,
        loading: false,
        page: 1,
        totalArticles: 0
    }
    document.title = this.props.category==='general'?'NewsMonkey - News Around You':`NewsMonkey - ${this.props.category[0].toUpperCase() + this.props.category.slice(1, this.props.category.length)}`;
  }
  updateNews= async p =>{
    this.props.setProgress(10);
    this.setState({
        loading: true
    })
    const APIUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + p}&pageSize=${this.props.pageSize}`;
    let data = await fetch(APIUrl);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
        articles: parsedData.articles,
        page: this.state.page + p,
        loading: false,
        totalArticles: parsedData.totalResults
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews(0);
  }
  handlePrevious = async()=>{
      this.updateNews(-1);
  }
  handleNext = async()=>{
    this.updateNews(1);
  }
  render() {
    const headStyle = {
      borderBottom: "0.08rem solid #8d99ae",
      color: "#2b2d42",
      padding: "1rem",
      marginTop: '5rem',
      marginBottom: '2rem'
    };
    return (
      <div className="container my-2">
        <h1
          className="shadow row d-flex justify-content-center"
          style={headStyle}
        >
          Welcome to News Monkey - {this.props.category==='general'?'News around You':this.props.category[0].toUpperCase()+this.props.category.slice(1, this.props.category.length)}
        </h1>
        {this.state.loading && <Spinner height="50vh"/>}
        {!this.state.loading && <div className="row">
          {this.state.articles.map((news)=>{
            return <div className="col-md-4" key={news.url}>
                     <NewsItem
                       title={news.title?news.title.slice(0, 60) + '...': 'Welcome to NewsMonkey. A free of cost news provider application'}
                       description={news.description?news.description.slice(0, 68) + '... ': 'News around you. We provide the relevant and fast news of what is happening around you'}
                       imageUrl={news.urlToImage?news.urlToImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhcoCP_2XlAg465vbRoB5lq9Q6c8ASpvo7fQ&usqp=CAU'}
                       newsUrl={news.url?news.url: '/'}
                       publishedAt={new Date(news.publishedAt).toGMTString().slice(0, 26)}
                       author={news.author}
                       source={news.source.name}
                     />
                   </div>
          })}
        </div>}
        {!this.state.loading && <div className="d-flex container justify-content-center align-items-center">
            Page {this.state.page} of {Math.ceil(this.state.totalArticles/this.props.pageSize)}
        </div>}
        {!this.state.loading && <div className="container d-flex flex-row justify-content-end my-5 align-items-center">
            <button disabled={this.state.page===1} className="btn btn-info mx-1 shadow" onClick={this.handlePrevious}>&larr; Previous</button>
            <button disabled={this.state.page===Math.ceil(this.state.totalArticles/this.props.pageSize)} className="btn btn-info mx-1 shadow" onClick={this.handleNext}>Next &rarr;</button>
        </div>}
      </div>
    );
  }
}

export default News;