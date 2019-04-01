import React from 'react';
import './ProductForm.css';

const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.state = {
            error: false,
            product: Object.assign({}, RESET_VALUES),
            style : {
                display : 'none',
                color : 'red'
            }
        };
    }
    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState((prevState) => {
            prevState.product[name] = value;
            return { product: prevState.product };
        });
    }
    handleSave(e) {
        this.props.onSave(this.state.product);
        this.setState({
            error: false,
            product: Object.assign({}, RESET_VALUES)
        });
        e.preventDefault();
    }
    formValidation() {
        this.state.product.name !== '' ? this.setState({error : false, style: {display : 'none'} }) : this.setState({error : true, style: {display : 'block', color: 'red'}});
        return (this.state.product.name !== '');
    }
    onClickSubmit(e) {
        if (this.formValidation()) {
            this.handleSave(e);
        }
    }
    render() {
        return (
            <form>
                <h3>Enter a new product</h3>
                <p>
                    <label>
                        Name
                        <br />
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name}/>
                    </label>
                    <span style={this.state.style}>*required field!</span>
                </p>
                <p>
                    <label>
                        Category
                        <br />
                        <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} />
                    </label>
                </p>
                <p>
                    <label>
                        Price
                        <br />
                        <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} />
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked}/>
                        &nbsp;In stock?
                    </label>
                </p>
                <input type="button" value="Save" onClick={this.onClickSubmit}/>
            </form>
        );
    }
}

export default ProductForm;