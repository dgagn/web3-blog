import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useTopbar from '../hooks/use-topbar';

function TopBar() {
  const {progress} = useTopbar();

  return (
    <ProgressBar className={progress === 100 ? 'hide' : ''} now={progress} />
  );
}

export default TopBar;
