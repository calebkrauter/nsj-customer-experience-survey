'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  title?: string;
  itr: number;
  updateRating: (value: number, itr: number) => void;
  error: string;
  reset: { getRating: number; setRating: Dispatch<SetStateAction<number>> };
  showLabel?: boolean;
}
export function Stars({
  title,
  itr,
  updateRating,
  error,
  reset,
  showLabel,
}: Props) {
  const [getRating, setRating] = useState(0);

  function handleRating(rating: number) {
    const curRating = getRating === rating ? 0 : rating;
    setRating(curRating);
    updateRating(curRating, itr);
  }

  useEffect(() => {
    async function resetRating() {
      if (reset.getRating === -1) {
        setRating(0);
        reset.setRating(0);
      }
    }
    resetRating();
  }, [reset]);
  return (
    <div
      className={`subject ${showLabel ? 'ratingHeader' : ''} ${error ? 'error' : ''}`}
    >
      {title && showLabel && <div className='ratingGroup'>{title}</div>}
      <div id='ratingGroup' className='ratingGroup'>
        <div className={`stars`}>
          <div
            className={`subject ${error && getRating === 0 ? 'error errorStars' : ''}`}
          >
            {error}
          </div>
          {[1, 2, 3, 4, 5].map((rating) => {
            return (
              <div key={rating}>
                <svg
                  id={`star${rating}`}
                  height='25px'
                  width='25px'
                  version='1.1'
                  className={`subject star ${getRating === rating ? 'toggleStars' : ''}`}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 473.486 473.486'
                  onClick={() => {
                    handleRating(rating);
                  }}
                >
                  <polygon
                    points='473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 
	237.732,386.042 384.416,460.829 357.032,298.473 '
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
