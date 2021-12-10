import React, {useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UserLogout from './user-logout';

function Nav({user, logout, links}) {
  const navigate = useNavigate();
  const closeSession = useCallback(() => {
    logout();
    navigate('/');
    sessionStorage.clear();
  }, [logout, navigate]);
  return (
    <div className="container max-w-md mt-md pb-md">
      <nav className="nav gap-y-md">
        <Link to="/">
          <h3 className="logo logo-size pointer">Blog</h3>
        </Link>
        <ul className="nav__list gap-y-md">
          {links?.map(link => (
            <li key={link.name}>
              <Link to={link.route}>
                <button className="button-reset text-bg-fx text-bg-fx--scale-y">
                  {link.name}
                </button>
              </Link>
            </li>
          ))}
          {user && logout && (
            <UserLogout logout={closeSession} name={user?.name} />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
