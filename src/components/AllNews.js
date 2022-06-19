import React, { Component } from 'react';
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

export class AllNews extends Component {
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
    articles= [];
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalArticles: 0
        }
    }
    updateNews= async () =>{
        const APIUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(APIUrl);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalArticles: parsedData.totalResults
        })
    }
    fetchData = async()=>{
        this.setState({
            page: this.state.page + 1
        })
        const APIUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(APIUrl);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults
        })
    }
    componentDidMount(){
        this.updateNews();
    }
    render() {
        const headStyle = {
            borderBottom: "0.08rem solid #8d99ae",
            color: "#2b2d42",
            padding: "1rem",
            width: '100vw',
            margin: '5rem auto 2rem',
            // marginTop: '5rem',
            // marginBottom: '2rem',
        };
        return (
            <>   
                <h1 className="container shadow row d-flex justify-content-center align-items-center"
                    style={headStyle}>
                    Welcome to News Monkey - {this.props.category==='general'?'News around You':this.props.category[0].toUpperCase()+this.props.category.slice(1, this.props.category.length)}
                </h1>
                {this.state.loading && <Spinner height="55vh"/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner/>}
                >
                  <div className="container">
                  <div className="row">
                    {this.state.articles.map((news)=>{
                        return <div className="col-md-4 my-2" key={news.url}>
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
                  </div>
                  </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default AllNews
