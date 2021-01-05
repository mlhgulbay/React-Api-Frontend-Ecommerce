import React, { Component } from 'react';
import {
   UncontrolledDropdown,
   DropdownToggle,
   DropdownItem,
   DropdownMenu,
    Badge, 
    NavItem,
     NavLink
  } from "reactstrap";
  import {Link} from "react-router-dom"

export default class CartSummary extends Component {
    
        renderSummary(){
        return( 
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Sepetiniz-{this.props.cart.length}
            </DropdownToggle>
            <DropdownMenu right>
                {
                    this.props.cart.map(cartItem =>(//her bir dropdown ıtem için elemanları gösterme
                      <DropdownItem key ={cartItem.product.id}>
                        <Badge color="danger" onClick = {()=>this.props.removeFromCart(cartItem.product)}>
                         Sepetten Sil
                        </Badge>
                          {cartItem.product.productName}
                          <Badge color="success">
                              {cartItem.quantity}
                          </Badge>
                      </DropdownItem>
                    ))
                }

              <DropdownItem divider />
              <DropdownItem>
                <Link to ="cart">Go to cart</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> )}
          renderEmptyCart(){
              return(
              <NavItem>
                <NavLink>
                    Sepetiniz Boş
                </NavLink>
            </NavItem>)       
          }
        render() {
       
            return (
                <div>
                    {this.props.cart.length>0?this.renderSummary():this.renderEmptyCart()}
                </div>
            )
    }
        
}
