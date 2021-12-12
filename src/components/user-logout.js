import React from 'react';

/**
 * The logout user button with user name
 *
 * @return {JSX.Element} the logout user button with user name
 * @constructor
 */
function UserLogout({name, logout}) {
  return (
    <li>
      <span className="mr-md">{name}</span>
      <button onClick={logout} className="button-reset link-fx-4">
        logout
      </button>
    </li>
  );
}

export default UserLogout;
