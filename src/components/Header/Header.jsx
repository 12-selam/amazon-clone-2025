import React, { useContext } from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { SlLocationPin } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import LowerHeader from './LowerHeader';
import { BiCart } from 'react-icons/bi';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'

const Header = () => {
  const [{user,basket}, dispatch] = useContext(DataContext); // ✅ this is correct
  
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0)|| 0;

  return (
    <>
      <section className={classes.fixed}>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
          </div>

          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>

          <div className={classes.order_container}>
            <Link className={classes.language} to="#">
              <img
                src="http://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_United_States.svg.png"
                alt="US Flag"
              />
              <select name="" id="">
                <option value="EN">EN</option>
              </select>
            </Link>

            <Link to={!user ? "/auth" : "#"} className={classes.signin}>
            <div>
             {user ? (
              <>
              <p>Hello {user.email?.split("@")[0]}</p>
               <span onClick = {()=>auth.signOut()} style={{ cursor: "pointer" }}>Sign Out</span>
              </>
            ):(
              <>
              <p>Hello, sign In</p>
              <span>Account & Lists</span>
              </>
            )}
            </div>     
            </Link>
            <Link to="/payments">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
