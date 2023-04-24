import React, { Component } from 'react'

export class Newsitems extends Component { 
  render() {
    let {title,description,urlImage,newsurl,author,date,source}=this.props;
    return (
      <div>
             
            <div className="card" >{/* style={{width: "18rem"}} */}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"88%", zIndex:1}}>{source}</span>
            <img src={urlImage} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} ...</h5>
                <p className="card-text">{description} .</p>
                <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsurl} target='blank' className="btn btn-sm btn-primary">Read more</a>
            </div>
            </div>
      </div>
    )
  }
}
export default Newsitems
