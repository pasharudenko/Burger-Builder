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
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
              },
              valid: false,
              touched: false
          },
          street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Street'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
              },
              valid: false,
              touched: false
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your ZIP Code'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
              },
              valid: false,
              touched: false
          },
          country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Country'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
              },
              valid: false,
              touched: false
          },
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
              },
              valid: false,
              touched: false
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      { value: 'fastest', displayValue: 'Fastest' },
                      { value: 'cheapest', displayValue: 'Cheapest' }
                  ]
              },
<<<<<<< HEAD
              value: 'fastest'
          }
        },
=======
              value: '',
              valid: true,
              touched: false
          }
        },
        loading: false,
        formStatus: false
>>>>>>> 892f39329c3f92930d55797728ea92e96e9557ed
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

    checkValidation = (element) => {
        element.touched = true;
        if(element.validation.required) {
            element.valid = element.value.trim() !== '';
        }

        if(element.validation.maxLength) {
            element.valid = element.valid && (element.value.length <= element.validation.maxLength);
        }

        if(element.validation.minLength) {
            element.valid = element.valid && (element.value.length >= element.validation.minLength);
        }

       return element;
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
        updatedOrderForm[id] = this.checkValidation(updatedOrderForm[id]);

        for (let element in updatedOrderForm) {
            if(!updatedOrderForm[element].valid) {
                this.state.formStatus = false;
                break;
            }
            this.state.formStatus = true;
        }

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
                                className: !curr.config.valid && curr.config.touched ? classes.Input + ' ' + classes.Error : classes.Input,
                                options: curr.config.elementConfig.options
                            };
                        } else {
                             params = {
                                key: curr.id,
                                name: curr.id,
                                elementType: curr.config.elementType,
                                className: !curr.config.valid && curr.config.touched ? classes.Input + ' ' + classes.Error : classes.Input,
                                type: curr.config.elementConfig.type,
                                placeholder: curr.config.elementConfig.placeholder
                            };
                        }
                        return (
                           <Input { ...params } onChange={(event) => this.inputChangedHandler(event, curr.id)}/>
                       );
                    })
                }
                <Button btnType="Success" disabled={!this.state.formStatus}>ORDER</Button>
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