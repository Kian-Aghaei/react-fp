import React from 'react'
import ProductRow from './ProductRow.js'
import SortableColumnHeader from './SortableColumnHeader.js'

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortByColumnAndDirection = this.sortByColumnAndDirection.bind(this);
        this.state = {
            sort : {
                column : 'Price',
                direction : 'desc'
            }
        };
    };
    sortByColumnAndDirection(objectA, objectB){
        let isDesc = this.state.sort.direction === 'desc' ? -1 : 1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
        if (this.state.sort.column === 'price') {
            [a, b] = [a, b].map((value) => parseFloat(value.replace(/[^\d.]/g, ''), 10));
        }
        if (a > b) {
            return isDesc;
        }
        if (a < b) {
            return -1 * isDesc
        }
        return 0;
    }
    sortProducts() {
        let productAsArray = Object.keys(this.props.product).map((pid) => this.props.product[pid]);
        return productAsArray.sort(this.sortByColumnAndDirection);

    };
    render(){
        let rows = [];
        this.sortProducts().forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            rows.push(
                <ProductRow product={product} key={product.id}/>
            )
        });
        return (
            <table>
                <thead>
                    <tr>
                        <SortableColumnHeader
                            currentSort={this.state.sort}
                            column="Name"/>
                        <SortableColumnHeader
                            currentSort={this.state.sort}
                            column="Price"/>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {rows}
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ProductTable;