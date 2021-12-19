function App() {
  // We've already added a call to React.useState that will create a state value 
  // called melons and initialized the initial state of this to be an empty object: the {}
  const [melons, setMelons] = React.useState({});
  /*     ^^^^^^  ^^^^^^^^^                   ^^
  When React has successfully mounted App to the DOM, we want to request melon 
  data from Flask and use it to populate the melons state value. 
  We are passing this state value to AllMelonsPage as a prop so when the melons 
  state value is updated, the AllMelonsPage component will receive the updated 
  melons value as its prop and thus show all of the melons we retrieved from the server.*/

  /* App is a React component defined at the top of the file. 
  We should start with what actually appears on the DOM. Remember that the 
  return value of a functional component is what will appear on the UI so 
  take a look at that (start on line 4).
  The return value is pretty straightforward — it just returns a bunch of JSX. */
  


  /* Making a request to the server is a side effect so use the useEffect React 
  hook to make the request. You can do this by passing React.useEffect a function
  that will make a request to the backend using fetch and then update the melons
  state value using the setMelons function we got back from React.useState.
  You only need to make this request on the initial page load so you should
  pass in a dependency list to useEffect as the second argument. */
  React.useEffect(() => {
    fetch('/api/melons')
    .then((response) => response.json())
    .then((melonData) => setMelons(melonData))   
    // See setMelons on line 4...
  }, [])  // <---- Empty array here means execute once.


  /* First, we need to add a shopping cart to the state. 
  A good data structure to use is an object.
  The properties will be melon codes and the values will be the # of 
  melons added to the shopping cart. It’ll look something like this:
  {cren: 2, musk: 1} */
  const [shoppingCart, setShoppingCart] = React.useState({});
  /* We will manage all application state in the App component so you 
  should add a call `React.useState` that creates a state value called 
  `shoppingCart` and sets the initial state to an empty object. After 
  you finish this, take a look below to make sure you have something 
  similar */




  function addMelonToCart(melonCode) {
    setShoppingCart((currentShoppingCart) => {
      const newShoppingCart = Object.assign({}, currentShoppingCart);
      /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      The Object.assign() method copies all enumerable own properties 
      from one or more source objects to a target object. 
      It returns the modified target object. */
      
      // Remember the data looks like this: {cren: 2, musk: 1}
      if (newShoppingCart[melonCode]) {
        newShoppingCart[melonCode] += 1;
      } else {
        newShoppingCart[melonCode] = 1;
      }

      console.log(newShoppingCart)
      
      return newShoppingCart;
    })
  }




  return (
    // We have to wrap all links and pages with this component, 
    // otherwise ReactRouterDOM won’t work correctly
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon"/>
      <div className="container-fluid">
      {/* This is like @app.route() in Flask and is used to create our frontend 
      routes so we can make a single page app (all the routing will be handled 
      by React Router on the frontend and we won’t hit our server when the page 
      URL changes).
      It has two important things:
        path — the route’s URL
        a child element which is the component that will be 
        rendered when someone goes to this path */}
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        {/* <ReactRouterDOM.Route exact path="/shop">  This is the path part */}
        <ReactRouterDOM.Route exact path="/shop">
          {/* <AllMelonsPage melons={melons} /> This is the child element, component */}
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart" >
          <ShoppingCartPage melons={melons} cart={shoppingCart}  />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

/* It’s easier to follow data around the React app if we start at the code that 
actually renders components to the DOM. That is, we need to find the file that 
calls ReactDOM.render. In this case, it’s static/js/App.jsx. Let’s start there.
Open static/js/App.jsx in your editor and scroll down to the bottom of the file.
The last line calls ReactDOM.render and renders a component called App: */
ReactDOM.render(<App />, document.querySelector("#root"));
