import React, { Component } from 'react';
import {ListGroup,ListGroupItem} from 'reactstrap';

export default class CategoriList extends Component {//this.props.title yapısında this kelimesi 
    //C#,Java gibi dillerde CategoriList'e KARŞILK GELİRKEN JS'de Component 'e karşılık gelir.
    state = {
            categories :[]
            
    }

    componentDidMount(){
     this.getCategories();
    }
     getCategories = () =>{
        fetch("http://localhost:3001/categories")
        .then(response =>response.json())
        .then(data=>this.setState({categories: data }));
     }
    
    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <ListGroup>{
                            this.state.categories.map(category =>(
                                <ListGroupItem active ={category.categoryName === this.props.currentCategory?true:false}
                                onClick ={()=>{this.props.ChangeCategory(category)}}
                                key ={category.id}>
                                    {
                                        category.categoryName
                                    }
                                </ListGroupItem>
                            ))
                    }  
                </ListGroup>
            </div>
        )
    }
}