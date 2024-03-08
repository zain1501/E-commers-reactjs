import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShopingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'


function Header() {
  const [{basket , user }] = useStateValue();
  const handleAuthantication = () =>{
    if(user){
      auth.signOut();
    }
  }

  return (
    <div className='header'>
      <Link to={"/"}>
      
      
        <img 
            className='header__logo'
            src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 
            alt='logo'
        />
      </Link>
        <div 
        className='header__search'>
            <input className="header__searchInput"
            type="text"/>
            <SearchIcon className='header__searchIcon'/>
        </div>
        <div className="header__nav">
          <Link  to={!user && "/login"}>
          <div onClick={handleAuthantication}  className='header__optaions'>
            <span className='header__optaionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
            <span className='header__optaionLineTwo'>{user ? 'Sign Out': 'Sign In'}</span>

          </div>
          </Link>

          <div className='header__optaions'>
          <span className='header__optaionLineOne'>refrence</span>
            <span className='header__optaionLineTwo'>product</span>
          
          </div>
          
          <div className='header__optaions'>
            <span className='header__optaionLineOne'>your</span>
            <span className='header__optaionLineTwo'> prime</span>
          </div>

            <Link to={"./checkout"}>

            <div className='header__optaionBasket'>
              <ShopingBasketIcon/>
              <span className='header__optaionLineTwo header__basketCount'>{basket.length}</span>
            </div>

            </Link>
          
        </div>
    </div>
  )
}

export default Header