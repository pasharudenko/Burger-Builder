import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import * as actions from '../../store/actions/index';

class Checkout extends Component {
    
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
    
        let summary = <Redirect to="/" />
        if(this.props.ings) {
      
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <Fragment>
                    { purchaseRedirect }
                    <CheckoutSummary ingredients={this.props.ings} checkoutCanceled={this.checkoutCanceledHandler} checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
                </Fragment>
            )
        }
        return (
            <div>
                { summary }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);