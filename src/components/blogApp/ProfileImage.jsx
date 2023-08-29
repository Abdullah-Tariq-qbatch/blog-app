import React from 'react';
import PropTypes from 'prop-types';

function ProfileImage({ src }) {
  return (
    <div
      className="w-14 h-14 bg-white dark:bg-gray-900 flex items-center justify-center rounded-full text-white border border-pink-custom dark:border-pink-800"
    >
      <img src={src} alt="" className="w-full h-full" />
    </div>
  );
}

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ProfileImage;
