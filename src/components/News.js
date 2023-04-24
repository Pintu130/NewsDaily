import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
   
     static defaultProps ={
      country:'in',
      pageSize:8,
      category:'general'
    }

    capitalizeFirstletter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      constructor(props){
         super(props);
         this.state={
            articles:[],
            loading: false,
            page:1,
            totalResults: 0
       }
       document.title=`${this.capitalizeFirstletter(this.props.category)} - NewsDaily`;
      }
       async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e4363830bf849ecad15c5709a128f54&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData= await data.json()
        console.log(parseData);
        this.setState({articles: parseData.articles,
        totalResults:parseData.totalResults,
        loading: false,   
    })
    }
     async componentDidMount(){
            this.updateNews();
   }

   fetchMoreData =  async()=>{
    this.setState({page: this.state.page +1})
         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e4363830bf849ecad15c5709a128f54&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({loading: true});
        let data = await fetch(url);
        let parseData= await data.json()
        this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults:parseData.totalResults,
        // loading: false 
    })
   };
  render() {
    return (

      <>
        <h2 className="my-2 text-center">NewsDaily - Top Headlines{this.capitalizeFirstletter(this.props.category)}</h2>
        {/* {this.state.loading && <Spinner/>} */}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==(this.state.totalResults)}
          loader={<Spinner/>}
          
        >
        <div className='container'>
        <div className='container'>

        <div className='row'>
            {this.state.articles.map((element)=>{
              return <div className="col-md-4 my-4" key={element.url}>
                <Newsitems  title={element.title?element.title.slice(0,45):""} description={element.description?element.title.slice(0,88):""} urlImage={element.urlToImage}  newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
        </div>
        </div>
        </div>
        </InfiniteScroll>
        <div className='container d-flex justify-content-between'>
        </div>
      </>
    )
  }
}
export default News
