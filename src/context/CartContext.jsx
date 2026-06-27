import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'chicks_cart';

function loadCart() {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, qty } = action.payload;
      const existing = state.find(
        (item) => item.productId === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return state.map((item) =>
          item.productId === product.id && item.size === size && item.color === color
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...state,
        {
          productId: product.id,
          name: product.name,
          image: product.images[0],
          size,
          color,
          qty,
          unitPrice: product.salePrice || product.price,
        },
      ];
    }
    case 'REMOVE_ITEM':
      return state.filter(
        (item) =>
          !(item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color)
      );
    case 'UPDATE_QTY':
      return state.map((item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
          ? { ...item, qty: Math.max(1, action.payload.qty) }
          : item
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, size, color, qty = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color, qty } });

  const removeItem = (productId, size, color) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, color } });

  const updateQty = (productId, size, color, qty) =>
    dispatch({ type: 'UPDATE_QTY', payload: { productId, size, color, qty } });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const shippingCost = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, shippingCost, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
