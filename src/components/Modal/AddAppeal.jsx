import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../Modal/modal.css";
import arrow_icon from '../../asserts/icons/arrow_down.svg'
import {useNavigate, useParams} from "react-router-dom";
import { useSelector } from 'react-redux';

const AddAppeal = () => {
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState(0)
  const [text, setText] = useState('')
	const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true);


  const {user} = useSelector(state => state.user)

  // console.log(topic);

  const navigate = useNavigate()

  const getTopics = async () => {
    await axios.get('api/support/getTopicAppeals')
      .then(res => setTopics(res.data))
  }

  useEffect(() => {
    if (text.trim() === '') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [text])



  const addAppeal = async () => {
    if (topic === 0) {
      alert("Выберете категорию");
    }
    const data = {
      topicOfAppealId: topic,
      userId: user.items.id,
      text
    }
    // console.log(data);
    await axios.post('api/support/createAppeal', data)
      .then(res => {
        navigate(`/appeal/?id=${res.data.id}`)
      })
  }
  useEffect(() => {
    getTopics()
  }, [])


  return (
    <div className='column flex'>
      <h1 className='add_appeal-title'>Создание обращения</h1>
			<div className="filter">
				<div className="Edited_appeal-select">
					<div className="flex items-center space-between Edited_filter-header" onClick={() => setOpen(!open)}>
						{/* Вывожу значние topic  */}
						{topic === 0 ? 'Выберите вариант...' : topics.find(item => item.id === parseInt(topic))?.name}
						<img src={arrow_icon} alt=""/>
					</div>
					<div className={open ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
						{
							topics.map(item => (
								// Предаю значиение item.name после topic присваиваю значиение при клике
								<div className='Edited_filter_select-item' onClick={() => {
									setTopic(item.id)
									setOpen(!open)
								}}>{item?.name}</div>
							))
						}
					</div>
				</div>
			</div>
			<textarea className='add_appeal-textarea' value={text}
								onChange={(e) => setText(e.target.value)}></textarea>
			<button disabled={isLoading} className='main_black_btn w-max h-38' onClick={addAppeal}>Содать обращени</button>
		</div>

	);
};

export default AddAppeal;