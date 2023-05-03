import { useState, useEffect } from 'react';

const AlertSuccess = ({ mensaje }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1000); 

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className="flex justify-center p-2 text-white bg-green-500 rounded-sm">
          {mensaje}
        </div>
      )}
    </>
  );
};

export default AlertSuccess