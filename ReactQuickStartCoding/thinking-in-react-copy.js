// 根据第一次的三大问题重写

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}
class ProductRow extends React.Component {
  render() {
    const name = this.props.product.stocked ? this.props.product.name :
      <span style={{color: "red"}}>
        {this.props.product.name}
      </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}
class ProductTable extends React.Component {
  render() {
    const rows = [];
    const lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow product={product.category} />);
      }
      rows.push(<ProductRow product={product} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <th>Name</th>
          <th>Price</th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" value="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}
class FilterableProductTable extends React.Component {
  render() {
    return (
      <SearchBar />;
      <ProductTable products={this.props.products} />;
    );
  }
}
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
