import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './auth';

/**
 * The app's providers. Prevents huge chain of dependencies
 *
 * @return {JSX.Element} the app's providers
 * @constructor
 */
function AppProviders({children}) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
}

export default AppProviders;
