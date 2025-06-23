import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import ProductPageHeader from '../components/ProductPageHeader';

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    getCartTotal,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // This effect will run whenever cartItems changes, forcing a re-render.
  }, [cartItems]);

  return (
    <>
    <ProductPageHeader />
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate('/ecommerce')}
            className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <section className="md:col-span-2">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 border rounded">-</button>
                        <p className="px-4">{item.quantity}</p>
                        <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 border rounded">+</button>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <aside className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${getCartTotal().toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
            <button
  onClick={() =>
    navigate(`/checkout`, {
      state: { total: getCartTotal() },
    })
  }
  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700"
>
  Checkout
</button>

            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{' '}
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Clear Cart
                </button>
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
    </>
  );
};

export default CartPage; 