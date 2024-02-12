import React, {useState} from 'react';
import Back from "../ui/Back";
import StarComponent from "../components/ReviewComponents/StarComponents";
import BlackBtn from "../ui/BlackBtn";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

const AddReviewPage = () => {

  const navigate = useNavigate()

  const [review, setReview] = useState('')
  const [average, setAverage] = useState(1)

  const location = useLocation()
  const {userId} = location.state

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(userId)
    const data = {
      sellerId: userId,
      text: review,
      grade: average
    }
    await axios.post('api/user/review', data).then(res => {
      navigate(-1)
    })
  }

  return (
    <form className='addReviewPage' onSubmit={handleSubmit}>
      <Back/>
      <h1 className='addReview-title'>Ваш отзыв о пользоватле</h1>
      <span className='addReview-subtitle'>Оцените ваши впечатления о продавце</span>
      <StarComponent average={average} width={37} type={'write'} handleClick={handleChangeStar}/>
      <span className='addReview-text'>Поставьте оценку</span>
      <textarea className='addReview-textarea' placeholder='Напишите отзыв...' value={review}
                onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <BlackBtn size={'w-325px'} type={'white_text'} children={'Отправить отзыв'} btnType={'submit'}/>
    </form>
  );
};

export default AddReviewPage;