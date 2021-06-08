import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Fetch} from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import {CartContext} from "./cartContext";

//Functional wrapper on class component
export default function DetailWrapper() {

    // const {dispatch} = useCart()
    const {category, id} = useParams(); // var
    return (<Detail
            id={id}
            navigate={useNavigate()}
            // dispatch={dispatch}
        />
    )
}

class Detail extends React.Component {
    state = {
        sku: ""
    };

    //Consume context in class component
    static contextType = CartContext;



    render() {
        const {id, navigate} = this.props;
        const {sku} = this.state;


        return (
            // <CartContext.Consumer> {/* The consumer provides the context data using a render prop, passed to childre */}
            <Fetch url={`products/${id}`}
                render={ (product, loading, error) => {

                    if (loading) return <Spinner/>; // render spinner if fetch is still processing
                    if (!product) return <PageNotFound/>;
                    if (error) throw error;
                return <div id="detail">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p id="price">${product.price}</p>

                    <select
                        id="sku"
                        value={sku}
                        onChange={(event) => {
                            this.setState({sku: event.target.value});
                        }}
                    >
                        {/* Display all avaliable sizes for skues */}
                        <option value="">What size?</option>
                        {product.skus.map((s) => (
                            <option key={s.sku} value={s.sku}>
                                {s.size}
                            </option>
                        ))}
                    </select>

                    <p>
                        <button
                            disabled={!sku ? true : false}
                            className="btn btn-primary"
                            onClick={() => {
                                this.context.dispatch({type: "add", id: id, sku: sku});
                                navigate("/cart");
                            }}
                        >
                            Add to cart
                        </button>
                    </p>
                    <img src={`/images/${product.image}`} alt={product.category}/>
                </div>
            }}
            />
            // </CartContext.Consumer>

        );
    }


}