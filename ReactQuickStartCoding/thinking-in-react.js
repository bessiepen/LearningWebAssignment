class ProductCategoryRow extends React.Component {
  return() {
    <ProductTable>
      <p>{props.category}</p>
      {props.children}
    </ProductTable>
  }
}
class ProductRow extends React.Component {
  return() {
    <ProductCategoryRow>
      <p>{props.name}+{props.price}</p>
    </ProductCategoryRow>
  }
}
class ProductTable extends React.Component {
  return() {
    <div>
      <p>Name   Price</p>
      {props.children}
    </div>
  }
}
class SearchBar extends React.Component {
  return() {
    <div>
      <input value={value} />
      <input type="radio" />
    </div>
  }
}
class FilterableProductTable extends React.Component {
  return() {
    <div>
      <SearchBar />
      <ProductTable />
    </div>
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
