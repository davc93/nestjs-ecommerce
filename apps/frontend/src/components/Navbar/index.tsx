import React, { useContext, useReducer } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Cart, type Item } from '../../models/App.model'
import { routes } from '../../routes'
import { cartContext } from '../../contexts/CartContext'
import { userContext } from '../../contexts/UserContext'
import { cartReducerActions } from '../../contexts/cartReducer'

export const Navbar = () => {
  const [cartState, cartDispatch] = useContext(cartContext)
  const [userState, userDispatch] = useContext(userContext)
  const { user } = userState
  const [modelIsOpen, setModelIsOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <nav>
      <div className="menu">
        <ul>
          {routes.map(({ name, path, onlyPublic, privateRoute }) => {
            if ((user != null) && privateRoute) {
              return (
              <li key={name}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'link-active' : 'link'
                  }
                  onClick={() => { setModelIsOpen(false) }}
                  to={path}
                >
                  {name}
                </NavLink>
              </li>
              )
            }
            if ((user != null) && !onlyPublic) {
              return (
                <li key={name}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'link-active' : 'link'
                    }
                    onClick={() => { setModelIsOpen(false) }}
                    to={path}
                  >
                    {name}
                  </NavLink>
                </li>
              )
            }
            if ((user == null) && !privateRoute) {
              return (
                <li key={name}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'link-active' : 'link'
                    }
                    onClick={() => { setModelIsOpen(false) }}
                    to={path}
                  >
                    {name}
                  </NavLink>
                </li>
              )
            }
          })}
          {userState.user?.email && (
            <>
              <li>
                <h5>{userState.user?.email}</h5>
              </li>
              <li>
                <button className="btn--secondary" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="cart">
        <button style={{ background: 'transparent', border: 0, cursor: 'pointer' }} onClick={() => { setModelIsOpen(!modelIsOpen) }}><svg width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <defs> <polygon id="cart-a" points="0 0 1 3 11 3 12 0" /> <path id="cart-c" d="M4.01867032,7 L15.8260605,7 C15.8624695,7 15.8984188,7.0019917 15.9338076,7.00587329 L18.2075854,0.659227726 C18.3493483,0.263534454 18.7208253,0 19.1368299,0 L22.0108287,0 C22.5567095,0 22.9992334,0.44771525 22.9992334,1 C22.9992334,1.55228475 22.5567095,2 22.0108287,2 L19.8298966,2 L15.7669004,13.3407723 C15.6251376,13.7364655 15.2536606,14 14.8376559,14 L4.95360962,14 C4.52817021,14 4.15046241,13.7245699 4.01592666,13.3162278 L1.05071278,4.31622777 C0.83737186,3.66869665 1.31375252,3 1.98839574,3 L10.8840374,3 C11.4299182,3 11.872442,3.44771525 11.872442,4 C11.872442,4.55228475 11.4299182,5 10.8840374,5 L3.35973391,5 L4.01867032,7 Z M4.67760674,9 L5.66601137,12 L14.1445893,12 L15.2193828,9 L4.67760674,9 Z M6.93041888,19 C5.83865727,19 4.95360962,18.1045695 4.95360962,17 C4.95360962,15.8954305 5.83865727,15 6.93041888,15 C8.02218048,15 8.90722813,15.8954305 8.90722813,17 C8.90722813,18.1045695 8.02218048,19 6.93041888,19 Z M13.8492513,19 C12.7574897,19 11.872442,18.1045695 11.872442,17 C11.872442,15.8954305 12.7574897,15 13.8492513,15 C14.9410129,15 15.8260605,15.8954305 15.8260605,17 C15.8260605,18.1045695 14.9410129,19 13.8492513,19 Z" /> </defs> <g fill="none" fillRule="evenodd" transform="translate(0 3)"> <g transform="translate(4 10)"> <mask id="cart-b" fill="#ffffff"> <use xlinkHref="#cart-a" /> </mask> <use fill="#D8D8D8" xlinkHref="#cart-a" /> <g fill="#FFA0A0" mask="url(#cart-b)"> <rect width={24} height={24} transform="translate(-4 -13)" /> </g> </g> <mask id="cart-d" fill="#ffffff"> <use xlinkHref="#cart-c" /> </mask> <use fill="#000000" fillRule="nonzero" xlinkHref="#cart-c" /> <g fill="#7600FF" mask="url(#cart-d)"> <rect width={24} height={24} transform="translate(0 -3)" /> </g> </g> </g></svg>
</button>
        <span>{cartState.items.length}</span>
        <div
          className={`cart__products ${modelIsOpen ? '' : 'inactive'}`}
          style={{}}
        >
          <ul>
            {cartState.items.map((item: Item) => {
              const handleClick = () => {
                cartDispatch({
                  type: cartReducerActions.REMOVE_ITEM,
                  payload: { ...item.product }
                })
              }
              return (
                <li key={item.product.id}>
                  <div>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 80 }}
                    />
                    <h5>{item.product.name}</h5>
                    <span>Price: {item.product.price}</span>
                    <span>Quantity: {item.quantity}</span>
                    <button style={{ background: 'transparent', border: 0, cursor: 'pointer' }} onClick={handleClick}><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"/></svg></button>
                  </div>
                </li>
              )
            })}
            {cartState.items.length == 0 && <h4>No Hay Productos</h4>}
            <Link style={{ width: 'fit-content', alignSelf: 'center' }} className="btn--primary" onClick={() => { setModelIsOpen(false) }} to={'/checkout'}>
              Checkout
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}
