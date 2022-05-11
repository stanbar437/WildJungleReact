import React, { useReducer, useContext, createContext, useEffect } from 'react'
import { reducer, init } from './cartReducer'
import useLocalStorage from './useLocalstorage'

const ThirdCartContext = createContext(null)

export const ThirdCartProvider = ({
  children,
  initialCartItems = [],
  localStorageKey = 'thirdCart',
}) => {
  //read from localStorage
  // if localStorage has value with this key then use it to initialCartItems
  let items = initialCartItems

  if (!items.length) {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(localStorageKey)
      // Parse stored json or if none return initialValue
      items = item ? JSON.parse(item) : []
    } catch (error) {
      items = []
      console.log(error)
    }
  }

  const [state, dispatch] = useReducer(reducer, items, init)

  const [storedValue, setValue] = useLocalStorage(localStorageKey, items)

  useEffect(() => {
    if (JSON.stringify(state.items) !== storedValue) {
      setValue(state.items)
    }
  }, [state])

  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (sid) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: {
        sid,
      },
    })
  }

  const updateItem = (item) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: item,
    })
  }

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  const isInCart = (sid) => {
    return state.items.some((item) => item.sid === sid)
  }

  const plusOne = (sid) => {
    return dispatch({
      type: 'PLUS_ONE',
      payload: {
        sid,
      },
    })
  }
  /**
   * @param  {} sid
   */
  const minusOne = (sid) => {
    return dispatch({
      type: 'MINUS_ONE',
      payload: {
        sid,
      },
    })
  }

  return (
    <ThirdCartContext.Provider
      value={{
        cart: state,
        items: state.items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        isInCart,
        plusOne,
        minusOne,
      }}
    >
      {children}
    </ThirdCartContext.Provider>
  )
}

export const useThirdCart = () => useContext(ThirdCartContext)
