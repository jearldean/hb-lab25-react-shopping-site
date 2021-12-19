function Homepage(props) {
  return (
    <div id="home-banner" className="row">
      <div className="col">
        <h1>Ubermelon</h1>
        <p className="lead">Melons on demand.</p>
      </div>
    </div>
  );
}

function AllMelonsPage(props) {
  const { melons, addMelonToCart } = props;    // Looks like it hooks to App.jsx ln 37
  const melonCards = [];

  /* These came from the model.py: 
  melon_code = db.Column(db.String(8), primary_key=True)
  name = db.Column(db.String, nullable=False)
  price = db.Column(db.Float, nullable=False)
  image_url = db.Column(db.String, nullable=False)
  color = db.Column(db.String, nullable=False)
  seedless = db.Column(db.Boolean, nullable=False) */
  for (const melon of Object.values(melons)) {
    const melonCard = (
      <MelonCard
        key={melon.melon_code}
        code={melon.melon_code}
        name={melon.name}
        imgUrl={melon.image_url}
        price={melon.price}
        handleAddToCart={addMelonToCart}
      />
    );

    melonCards.push(melonCard);
  }
  return (
    <React.Fragment>
      <h1>All Melons</h1>
      <div id="shoppping">
        <div className="col-12 col-md-9 d-flex flex-wrap">{melonCards}</div>
      </div>
    </React.Fragment>
  );
}

function ShoppingCartPage(props) {
  const { melons, cart } = props;

  const tableData = [];
  let totalCost = 0;

  for (const itemCode in cart) {
    const thisMelon = melons[itemCode]
    const thisTotal = cart[itemCode] * thisMelon.price
    totalCost += thisTotal
    tableData.push(
      <tr key={itemCode}>
        <td>{thisMelon.name}</td>
        <td>{cart[itemCode]}</td>
        <td>${thisTotal.toFixed(2)}</td>
      </tr>
    )
  }


  return (
    <React.Fragment>
      <h1>Shopping Cart</h1>
      <div className="col-6">
        <table className="table">
          <thead>
            <tr>
              <th>Melon</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{ tableData }</tbody>
        </table>
        <p className="lead">Total: ${totalCost.toFixed(2)}</p>
      </div>
    </React.Fragment>
  );
}

function Navbar(props) {
  const { logo, brand } = props;

  return (
    <nav>
      <ReactRouterDOM.Link
        to="/"
        className="havbar-brand d-flex justify-content-center"
      >
        <img src={logo} height="30" />
        <span>{brand}</span>
      </ReactRouterDOM.Link>

      <section className="d-flex justify-content-center">
        <ReactRouterDOM.NavLink
        // NavLink: Creates <a> tags that link to a React Router route
          to="/shop"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Shop for Melons
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/cart"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Shopping Cart
        </ReactRouterDOM.NavLink>
      </section>
    </nav>
  );
}

function MelonCard(props) {
  const { code, name, imgUrl, price, handleAddToCart } = props;

  return (
    <div className="card melon-card">
      <ReactRouterDOM.Link to={`/shop/${code}`}>
        <img src={imgUrl} className="card-img-top" />
      </ReactRouterDOM.Link>
      <div className="card-body">
        <h5 className="card-title">
          <ReactRouterDOM.Link to={`/shop/${code}`}>{name}</ReactRouterDOM.Link>
        </h5>
      </div>
      <div className="card-body pt-0 container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <span className="lead price d-inline-block">
              ${price.toFixed(2)}
            </span>
          </div>
          <div className="col-12 col-lg-6">
            <button
              className="btn btn-sm btn-success d-inline-block"
              onClick={() => handleAddToCart && handleAddToCart(code)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
