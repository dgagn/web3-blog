import React, {useEffect, useMemo, useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {useLocation} from 'react-router-dom';

function TopBar() {
  const [progress, setProgress] = useState(0);
  const [previousLocation, setPreviousLocation] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPreviousLocation(location.pathname);
    setProgress(100);
    if (location.pathname === previousLocation) {
      setPreviousLocation('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(100);
  }, [previousLocation]);

  return (
    <ProgressBar className={progress === 100 ? 'hide' : ''} now={progress} />
  );
}

export default TopBar;
