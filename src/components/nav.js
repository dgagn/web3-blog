import React from 'react';
import {Link} from 'react-router-dom';

function Nav({user, logout, links}) {
  return (
    <div className="container max-w-md mt-xl pb-lg">
      <nav className="nav gap-y-md">
        <Link to="/">
          <h3 className="logo logo-size pointer">Blog</h3>
        </Link>
        <ul className="nav__list gap-y-md">
          {links.map(link => (
            <li key={link.name}>
              <Link to={link.route}>
                <button className="button-reset text-bg-fx text-bg-fx--scale-y">
                  {link.name}
                </button>
              </Link>
            </li>
          ))}
          <li>
            <span className="mr-md">Dany Gagnon</span>
            <button className="button-reset link-fx-4">logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
