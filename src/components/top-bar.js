import React, {useEffect, useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {useLocation} from 'react-router-dom';
import useTopbar from '../hooks/use-topbar';

function TopBar() {
  const {progress} = useTopbar();

  return (
    <ProgressBar className={progress === 100 ? 'hide' : ''} now={progress} />
  );
}

export default TopBar;
