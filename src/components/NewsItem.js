import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        const {title, description, imageUrl, newsUrl, publishedAt, author, source} = this.props;
        return (
            <div>
                <div className="card shadow" style={{width: '100%', marginBottom: '2rem'}}>
                    <img src={imageUrl} className="card-img-top" style={{height: '16rem'}} alt="..."/>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-info">Read News</a>
                    </div>
                    <div className="card-footer text-muted">
                        {author && `By ${author} on ${publishedAt}`}
                        {!author && `Published on: ${publishedAt}`}
                    </div>
                    <span className="position-absolute badge rounded bg-danger" style={{right: '-1vw', top: '-1vh'}}>{source}</span>
                </div>
            </div>
        )
    }
}

export default NewsItem
