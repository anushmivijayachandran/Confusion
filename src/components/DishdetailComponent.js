import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
//import Moment from 'react-moment';
//import 'moment-timezone';

class DishDetail extends Component {


    renderDish(dish) {
      if(dish != null){
        return(
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name}/>
              <div>
                <CardBody>
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>
                  </CardBody>
                </div>
            </Card>
        );
      }
      else {
        return(
          <div></div>
        );
      }
    }

    renderComments(comment){
      console.log("dish",comment);
      if(comment != null){
        const comments = comment.map((comment) => {
              return(
                <div key={comment.id}>
                    <CardText>{comment.comment}</CardText>
                  <CardText>--{comment.author},
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</CardText>
                    <CardText></CardText>
                </div>
              );
            });
      return(
        <div>
          <h4>Comments</h4>
        {comments}
        </div>);

    }

  else {
    return(
      <div></div>
    );
  }
  }

  render(){
    if (this.props.dish) {
            return (
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                  </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
              </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
  }
}

export default DishDetail;
