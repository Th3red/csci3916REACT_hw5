import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReview, fetchMovie } from '../actions/movieActions';
import { BsStarFill } from 'react-icons/bs';

const ReviewForm = ({ movieId }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!reviewText || !rating) {
      setMessage('Please fill in both review and rating.');
      return;
    }

    try {
      await dispatch(submitReview({ movieId, review: reviewText, rating: Number(rating) }));
      setMessage('Review submitted successfully!');
      setReviewText('');
      setRating(5);

      dispatch(fetchMovie(movieId));
    } catch (error) {
      setMessage('Failed to submit review.');
    }
  };

  return (
    <div>
      <textarea
        className="form-control"
        rows="3"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
      />
      <input
        type="number"
        className="form-control mt-2"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>
        Submit Review
      </button>
      {message && <p className="text-success mt-2">{message}</p>}
    </div>
  );
};

export default ReviewForm;
