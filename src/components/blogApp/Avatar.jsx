import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ initials, bgColor }) {
  return (
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${bgColor}`}
    >
      <span className="font-semibold" style={{ fontSize: '10px' }}>{initials}</span>
    </div>
  );
}

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default Avatar;
