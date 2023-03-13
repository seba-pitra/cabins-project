import axios          from 'axios';
import { IReview }    from '@/interfaces/Review';
import { ReviewCard } from './ReviewCard';
import { useEffect, useState } from 'react';

export const Reviews = (): JSX.Element => {
  const [reviews, setReviews] = useState<IReview[]>([])
 
  useEffect(() => {
    axios.get("http://localhost:3000/api/reviews")
         .then(res => {
          setReviews(res.data.data)
         })
         .catch(error => console.error(error))
  }, [])

  return (
    <div className=" border-4 border-solid border-lime-500 rounded">
      {
        reviews?.map(review => (
          <div key={review._id}>
            <ReviewCard 
              message       = {review.message}
              starsQuantity = {review.starsQuantity}
              title         = {review.title}
              visitorName   = {review.visitorName} />
          </div>
        ))
      }
    </div>
  );
};
