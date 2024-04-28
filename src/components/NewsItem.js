import React, { Component } from 'react';
import './news.css';

class NewsItem extends Component {
    render() {
        const { title, imageUrl, newsUrl } = this.props;

        return (
            <div className="news-item">
                <div className="card">
                    <img
                        src={!imageUrl ? "https://cdn.browshot.com/static/images/not-found.png" : imageUrl}
                        className="card-img-top"
                        alt="News Thumbnail"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
