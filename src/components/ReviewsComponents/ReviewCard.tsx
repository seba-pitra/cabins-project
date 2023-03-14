import { IReview } from "@/interfaces/Review";
import Rating      from '@mui/material/Rating';

export const ReviewCard = (props: IReview) => {
  return (
    <div className="m-5 p-3 w-96 border-4 border-solid border-lime-500 rounded">
      
      <div className="flex justify-between">
        <strong>
          {props.title}
        </strong>
        <p>
        <Rating name="read-only" value={props.starsQuantity} readOnly />
        </p>
      </div>

      <strong>
        {props.visitorName}
      </strong>

      <p>
        {props.message}
      </p>

    </div>
  );
};
