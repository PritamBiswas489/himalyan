import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-center notfound'>
        <div>
          <h2>404</h2>
          <h5>Page Not  found</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className='d-flex justify-content-center'>
            <li><Link to={'/'}>Back Home</Link></li>
            <li><Link to={'/'}>Contact Us</Link></li>
          </ul>

        </div>
      </div>
    </>
  )
}

export default Page404
