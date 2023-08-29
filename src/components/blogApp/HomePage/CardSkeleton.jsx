import React from 'react';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';

import { ReactComponent as FileSkeletonSvg } from '../../../assets/blogApp/svg/fileSkeleton.svg';
import { ReactComponent as ProfileSkeleton } from '../../../assets/blogApp/svg/profileSkeleton.svg';

function CardSkeleton() {
  return (
    <div className="max-w-sm bg-white dark:bg-gray-950 border dark:border-gray-950 border-gray-200 rounded-lg shadow flex flex-col animate-pulse">
      <div className="flex items-start pt-5 justify-center rounded-t-lg w-full h-44 mb-4 bg-gray-300 dark:bg-gray-700">
        <FileSkeletonSvg />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-900 rounded-lg px-5 -mt-14 mx-auto w-11/12 mb-5 z-10">
        <div className="flex justify-center -mt-7">
          <ProfileSkeleton />
        </div>

        <div className="flex justify-center mt-1">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
        </div>

        <div className="mt-2 mx-3 max-h-14 h-14">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48" />
        </div>

        <footer className="mt-5 p-4">
          <hr />
          <div className="flex items-center justify-between text-base">
            <div className="flex items-center">
              {' '}
              <HeartOutlined className="text-gray-300" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-300 dark:text-gray-200">
                {' '}

                0
              </span>
            </div>
            <div className="flex items-center">
              <CommentOutlined className="text-gray-300" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-300 dark:text-gray-200">0</span>
            </div>
          </div>
        </footer>
      </div>

    </div>

  );
}

export default CardSkeleton;
