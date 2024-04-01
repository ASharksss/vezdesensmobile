import React, {useEffect, useRef} from 'react';
import './style.css'

const MoreSubMenu = ({items, setOpen}) => {
  const wrapperRef = useRef(null)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target))
      setOpen(true) // исправил закрытие :)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef}>
      <div className='profile_card_submenu'>
        {
          items.map((item) => (
              <div className='profile_card_submenu-item' onClick={item.onClick}>
                <span className='pd-14'>{item.title}</span>
              </div>
            ))
        }

      </div>
    </div>
  );
};

export default MoreSubMenu;