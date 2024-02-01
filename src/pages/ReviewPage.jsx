import React, {useEffect, useState} from 'react';
import StarComponents from "../components/ReviewComponents/StarComponents";
import StarReviewBar from "../components/ReviewComponents/StarReviewBar";
import Back from "../ui/Back";
import ReviewPerson from "../components/ReviewComponents/ReviewPerson";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import axios from "axios";
import {pluralRusVariant} from "../utils";

const ReviewPage = () => {

	const location = useLocation()
	const {state} = location

	const [average, setAverage] = useState(0)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	const getReviews = async () => {
		if (state.userId) {
			await axios.get(`api/user/review/${state.userId}`)
				.then(res => {
					setData(res.data)
					setLoading(false)
				})
		}
	}

	useEffect(() => {
		getReviews()
	}, [])

	useEffect(() => {
		// Вычисление средней оценки рейтинга
		if (data.length > 0) {
			let ratings = data.map(item => item.grade)
			const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
			setAverage(sum !== 0 ? (sum / ratings.length).toFixed(2) : 0)
		}
	}, [data])


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
				<StarReviewBar average={5} data={data}/>
				<StarReviewBar average={4} data={data}/>
				<StarReviewBar average={3} data={data}/>
				<StarReviewBar average={2} data={data}/>
				<StarReviewBar average={1} data={data}/>
			</div>

			{/*      <StarComponents average={average} type={'write'} handleClick={handleChangeStar}/>*/}

			<span
				className='review_count'>{data.length} {`${["отзыв", "отзыва", "отзывов"][pluralRusVariant(parseInt(data.length))]}`}</span>

			<div className="review_list">
				{
					data.map((item, index) => (
						<ReviewPerson item={item} key={`review-${index}`}/>
					))
				}
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
