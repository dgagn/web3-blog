import React from 'react';

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
