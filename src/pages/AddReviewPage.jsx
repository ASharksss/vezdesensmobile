import React from 'react';
import Back from "../ui/Back";
import StarComponent from "../components/ReviewComponents/StarComponents";
import BlackBtn from "../ui/BlackBtn";

const AddReviewPage = () => {
  return (
    <div className='addReviewPage'>
      <Back/>
      <h1 className='addReview-title'>Ваш отзыв о пользоватле</h1>
      <span className='addReview-subtitle'>Оцените ваши впечатления о продавце</span>
      <StarComponent average={0} width={37}/>
      <span className='addReview-text'>Поставьте оценку</span>
      <textarea className='addReview-textarea'>
        Напишите отзыв...
      </textarea>
      <BlackBtn size={'w-325px'} type={'white_text'} children={'Отправить отзыв'}/>
    </div>
  );
};

export default AddReviewPage;