import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

/**
 * The top bar - progress bar at the top of the app.
 *
 * @return {{progress: number}} the progress of the bar
 */
function useTopbar() {
  const [progress, setProgress] = useState(0);
  const [previousLocation, setPreviousLocation] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPreviousLocation(location.pathname);
    setProgress(100);
    if (location.pathname === previousLocation) {
      setPreviousLocation('');
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setProgress(100);
  }, [previousLocation]);

  return {progress};
}

export default useTopbar;
