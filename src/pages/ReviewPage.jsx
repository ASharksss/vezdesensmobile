import React, {useState} from 'react';
import StarComponents from "../components/ReviewComponents/StarComponents";
import StarReviewBar from "../components/ReviewComponents/StarReviewBar";
import Back from "../ui/Back";
import ReviewPerson from "../components/ReviewComponents/ReviewPerson";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";

const ReviewPage = () => {
  const [average, setAverage] = useState(4)
  const handleChangeStar = (index, type) => {
    switch (type) {
      case 'full':
        setAverage(index + 1)
        break
      case 'empty':
        if (index === 0) setAverage(average + 1)
        else setAverage(index + 2)
        break
      default:
        break
    }
  }
  return (

    <div className='reviewPage'>

      <Back/>
      <h1 className='reviewPage-title'>Отзывы и пользователе</h1>
      <div className="flex items-center">
        <span className='average'>{average}</span>
        <StarComponents average={average} width={30}/>
      </div>
      <div>
        <StarReviewBar average={5} data={[]} />
        <StarReviewBar average={4} data={[]}/>
        <StarReviewBar average={3} data={[]}/>
        <StarReviewBar average={2} data={[]}/>
        <StarReviewBar average={1} data={[]}/>
      </div>

      {/*      <StarComponents average={average} type={'write'} handleClick={handleChangeStar}/>*/}

      <span className='review_count'>2564 отзыва</span>

      <div className="review_list">
        <ReviewPerson/>
        <ReviewPerson/>
        <ReviewPerson/>
        <ReviewPerson/>
        <ReviewPerson/>
        <ReviewPerson/>
      </div>

      <div className="addReview">
        <NavLink to='/addReview' className='noLink'>
          <BlackBtn size={'w-325px'} children={'Написать отзыв'} type={'white_text'}/>

        </NavLink>
      </div>
    </div>
  );
};

export default ReviewPage;