import React from "react";
import {saveShippingAddress} from "./services/shippingService";


// Enum stanu dla formularza
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default class Checkout extends React.Component {
    //state as class field
    state = {
        address: emptyAddress,
        status: STATUS.IDLE,
        saveError:null,
        touched: {}
    }
    isValid() {
      // Derived states
      const errors = this.getErrors(this.state.address);
      return Object.keys(errors).length === 0; // check empty error object

    }


    handleChange = (e) => {
        e.persist(); // persist the event, inaczej garbage collector wyczysci. w reakcie > 17 juz nie trzeba tego robic
        this.setState((state) => { // Wszystkoa co zwracamy z tej funkcji bedzie nowym stnem
            return {
                address:
                    {
                        ...state.address, [e.target.id]: e.target.value, // tu mozemy tego uzyc poniewaz id inputow sa takie same jak values (ex. city i adress.city) Odnosimy sie do propertisa obiektu uzywajac zmiennej
                    }
            }
        })
    }

    handleBlur = (event) => {
        event.persist();
        this.setState((state) => {
            return {touched: {...state.touched, [event.target.id]: true}}
        });
    }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({status: STATUS.SUBMITTING});
    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({type: "empty"});
        this.setState({status: STATUS.COMPLETED});
      } catch (e) {
        this.setState({saveError: e});
      }
    } else {
      this.setState({status: STATUS.SUBMITTED}); // With setState, React does a shallow merge. So we declare only the properties we'd like to set
    }
  }

  getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }

    render() {
        // In classes, the top of render is a good place to derive state !
        const {status, saveError, touched, address} = this.state;
        // Derive state
        const errors = this.getErrors(this.state.address)
        if (saveError) throw saveError;
        if (status === STATUS.COMPLETED) {
            //If form is completed we dont neet to render a form
            return <h1>Thanks for shopping!</h1>
        }


        return (
            <>
                <h1>Shipping Info</h1>
                {!this.isValid() && status === STATUS.SUBMITTED && (
                    <div role="alert">
                        <p>Fix the following errors:</p>
                        <ul>
                            {Object.keys(errors).map((key => {
                                return <li key={key}>{errors[key]}</li>
                            }))}
                        </ul>
                    </div>
                )}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="city">City</label>
                        <br/>
                        <input
                            id="city"
                            type="text"
                            value={address.city}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                        />
                        <p role="alert">
                            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="country">Country</label>
                        <br/>
                        <select
                            id="country"
                            value={address.country}
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                        >
                            <option value="">Select Country</option>
                            <option value="China">China</option>
                            <option value="India">India</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="USA">USA</option>
                        </select>
                        <p>
                            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
                        </p>
                    </div>

                    <div>
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Save Shipping Info"
                            disabled={status === STATUS.SUBMITTING}
                        />
                    </div>
                </form>
            </>
        );
    }
}
