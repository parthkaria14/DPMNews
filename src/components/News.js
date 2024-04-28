import React, { Component } from 'react';
import NewsItem from './NewsItem';
import './news.css';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            category: 'general', // Default category
            searchTerm: '', // Default empty search term
        };
    }

    async componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const { category, searchTerm, page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=c2bf7f7517a3488b928fd09d857d580e&page=${page}&category=${category}`;
        
        // Append search term if provided
        if (searchTerm) {
            url += `&q=${searchTerm}`;
        }

        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        });
    }

    handlePrevClick = async () => {
        await this.setState({
            page: this.state.page - 1
        });
        this.fetchData();
    };

    handleNextClick = async () => {
        await this.setState({
            page: this.state.page + 1
        });
        this.fetchData();
    };

    handleCategoryChange = async (category) => {
        await this.setState({
            category,
            page: 1 // Reset page when category changes
        });
        this.fetchData();
    };

    handleSearch = async () => {
        await this.setState({
            page: 1 // Reset page when search term changes
        });
        this.fetchData();
    };

    handleSearchChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    render() {
        return (
            <div className="container my-3">
                <div className="top-bar">
                    <div className="category-selector">
                        <button
                            className={`category-btn ${this.state.category === 'general' ? 'active' : ''}`}
                            onClick={() => this.handleCategoryChange('general')}
                        >
                            General
                        </button>
                        <button
                            className={`category-btn ${this.state.category === 'business' ? 'active' : ''}`}
                            onClick={() => this.handleCategoryChange('business')}
                        >
                            Business
                        </button>
                        {/* Add more category buttons as needed */}
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={this.state.searchTerm}
                            onChange={this.handleSearchChange}
                        />
                        <button className="search-btn" onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4 mt-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ''}
                                    description={element.description ? element.description : ''}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page >= Math.ceil(this.state.totalResults / 20)}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
