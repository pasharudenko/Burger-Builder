import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component{
    state = {
        orderForm: {
          name: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
              },
              value: ''
          },
          street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Street'
              },
              value: ''
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your ZIP Code'
              },
              value: ''
          },
          country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Country'
              },
              value: ''
          },
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email'
              },
              value: ''
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      { value: 'fastest', displayValue: 'Fastest' },
                      { value: 'cheapest', displayValue: 'Cheapest' }
                  ]
              },
              value: 'fastest'
          }
        },
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
          ...updatedOrderForm[id]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({
            orderForm: updatedOrderForm
        })
    };

    render() {
        const formArr = [];
        for (let key in this.state.orderForm) {
            formArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form className={classes.Form} onSubmit={this.orderHandler}>
                {
                    formArr.map(curr => {
                        let params;
                        if (curr.config.elementType === 'select') {
                            params = {
                                key: curr.id,
                                name: curr.id,
                                elementType: curr.config.elementType,
                                className: classes.Input,
                                options: curr.config.elementConfig.options
                            };
                        } else {
                             params = {
                                key: curr.id,
                                name: curr.id,
                                elementType: curr.config.elementType,
                                className: classes.Input,
                                type: curr.config.elementConfig.type,
                                placeholder: curr.config.elementConfig.placeholder
                            };
                        }
                        return (
                           <Input { ...params } onChange={(event) => this.inputChangedHandler(event, curr.id)}/>
                       );
                    })
                }
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
     return {
        onOrderBurger: (orderData) => {
            dispatch(actions.purchaseBurger(orderData));
       }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));