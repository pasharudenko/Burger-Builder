import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

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
              value: ''
          }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pasha Rudenko',
                address: {
                    street: 'Test Street 1',
                    zipCode: '413415',
                    country: 'England'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                purchasing: false
            });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({
                loading: false,
                purchasing: false
            });
        });
    };


    render() {

        let form = (
            <form className={classes.Form}>
                <Input inputType='input' name="name" placeholder="Your name" className={classes.Input}/>
                <Input inputType='email' name="email" placeholder="Your email" className={classes.Input}/>
                <Input inputType='input' name="street" placeholder="Your Street" className={classes.Input}/>
                <Input inputType='input' name="postal" placeholder="Your Postal" className={classes.Input}/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
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

export default ContactData;