import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
//import Moment from 'react-moment';
//import 'moment-timezone';

function RenderDish({dish}) {
      if(dish != null){
        return(
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name}/>
              <div>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
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

    function RenderComments(comments){
      if(comments != null){
        const comment = comments.comments.map((comment) => {
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
        {comment}
        </div>);

    }

  else {
    return(
      <div></div>
    );
  }
  }

  const DishDetail = (props) =>

  {
    if (props.dish) {
      return (
          <div className="container">
          <div className="row">
              <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
              </div>
              <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments} />
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

export default DishDetail;
