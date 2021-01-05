import React, { Component } from 'react';
import Navi from './Navi';
import CategoriList from './CategoriList';
import ProductList from './ProductList';
import {Container,Row,Col} from 'reactstrap';
import alertify from "alertifyjs";
import {Route,Switch} from 'react-router-dom';
import NotFound from "./NotFound"
import CartList from "./CartList"


export default class App extends Component {
  state={currentCategory:"", products:[], cart :[]} 

  componentDidMount(){
    this.getProducts();
  }
  ChangeCategory = (category)=>{
    this.setState({currentCategory:category.categoryName})
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {//hangi evente tıklarsak o eventin bir daha çalışmasını istiyoruz.
    let url = "http://localhost:3001/products";
    if(categoryId){//eğer url varsa
      url+="?categoryId=" + categoryId;
    }
    fetch(url)
    .then(response =>response.json())
    .then(data=>this.setState({products: data }));
    
  } 
  addToCart =(product)=> {//eklenen product ve adedini tutmak istiyoruz bu yüzden daha önce eklenmiş mi diye kontrol ediyoruz
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart:newCart });
    // alertify.notify()
    alertify.success(product.productName + " added to cart!",2);//alertify lar 2 sn kalsın
  };
  removeFromCart=(product)=>{
      let newCart = this.state.cart.filter(c=>c.product.id !== product.id)
      this.setState({cart:newCart})
      alertify.error(product.productName + " removed from cart!");
  }
  
  render() {
     let productInfo = {title:"ProductList"}
     let categoryInfo = {title:"CategoryList"}
      return (
        <div>
        <Container>
        <Navi removeFromCart={this.removeFromCart} cart ={this.state.cart}></Navi>
          <Row>
            <Col xs = "3">
               <CategoriList currentCategory={this.state.currentCategory}
                ChangeCategory ={this.ChangeCategory}
                 info = {categoryInfo}> 
                 </CategoriList>
              
             </Col>
            <Col xs = "9">
              <Switch>
                <Route exact path ="/" render ={ props=>(

                <ProductList 
                      {...props}//propsların kopyasını al onu gönder
                      products = {this.state.products}
                      addToCart = {this.addToCart}
                      currentCategory={this.state.currentCategory} 
                      info = {productInfo}>
                </ProductList>)}>
                </Route>
                <Route exact path ="/cart" 
                render ={ props=>(

                <CartList 
                      {...props}//propsların kopyasını al onu gönder
                      cart = {this.state.cart}
                      removeFromCart = {this.removeFromCart} >
                </CartList>)
                  }>            
                   </Route>
              
                <Route component={NotFound}></Route>
              </Switch>
              
                </Col>
         
          </Row>
        </Container>
         
 </div>
      )
  }
}

