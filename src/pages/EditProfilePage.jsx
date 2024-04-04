import React, {useEffect, useState, useRef} from 'react';
import Back from "../ui/Back";
import loadGif from '../asserts/load.gif'
import avatarTemplate from '../asserts/on.jpg' // шаблон фотки
import Input from "../ui/input";
import BlackBtn from "../ui/BlackBtn";
import WhiteBtn from "../ui/WhiteBtn";
import { Navigate, useNavigate,  useParams} from 'react-router-dom'
import axios from 'axios';
import InputMask from 'react-input-mask'
import {AVATAR_HOST, DataURIToBlob} from "../utils"; // для фоток
import AvatarEditor from 'react-avatar-editor' // форма для фотки
import { useSelector } from 'react-redux';
import PreloaderComponent from '../components/Preloader/PreloaderComponent';

const EditProfilePage = () => {
	const {id} = useParams();
	const {user} = useSelector(state => state.user)
	const formData = new FormData();
	const [data, setData] = useState([]);
	const  editImageRef = useRef(null);
	const [image, setImage] = useState(null)
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	const [email, setEmail] = useState(data.email)
	const [phone, setPhone] = useState(data.phone)
	const [saveImage, setSaveImage] = useState(null)
	const [editImageShow, setEditImageShow] = useState(false)
	const [scale, setScale] = useState(1) //для изменения фото
	const [rotate, setRotate] = useState(0) //для изменения фото
	const [loading, setLoading] = useState(false)
	const navigation = useNavigate();

	const getData = async () => {
		await axios.get(`/api/user/getOneUser/${id}`)
		.then(res => {
			setData(res.data)
			document.title = `Профиль ${res.data.name}`
			const parts = res.data.name.split(' ');
        	setFirstName(parts[0] || "");
        	setLastName(parts[1] || '');
			setEmail(res.data.email)
			setPhone(res.data.phone)
			// setImage(res.data.userAvatars.length > 0 ? `${AVATAR_HOST}/${res.data.userAvatars[0].name}` : null) // вывод фотографии
		})
		.catch((err) => {
			console.warn(err);
			alert('Ошибка при получении данных');
		})
		
	}

// рендер фото
	const toDataURL = name => fetch(`${AVATAR_HOST}/${name}`)
		.then(response => response.blob())
		.then(blob => new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result)
			reader.onerror = reject
			reader.readAsDataURL(blob)
		}))

	useEffect(() => {
		try {
			if (data.userAvatars.length > 0) {
				toDataURL(data.userAvatars[0].name).then(dataUrl => {
					setImage(dataUrl)
					setSaveImage(dataUrl)
				})
			}
		} catch (e) {
	
		}
	}, [data])
// кнопка отмена, просто перзагружает страницу
	const handleCancle = function() {
		window.location.reload();
	}
// кнопка сохранения
	const handleSubmit = async(event) => {
		event.preventDefault()
		const fullName = `${firstName} ${lastName}`
		formData.append('name', `${fullName}`)
		formData.append('email', email)
		formData.append('phone', phone)
		if (saveImage !== null) {
			const postImage = DataURIToBlob(saveImage)
			formData.append('avatar', postImage)
		} else {
			formData.append('avatar', saveImage)
		}
		await axios({
			method: 'post',
			url: 'api/user/edit',
			data: formData,
			headers: {"Content-Type": "multipart/form-data"}
		}).then((res) => {
			if (res.data.status === 403) {
				window.alert(res.data.message)
			} else {
				setLoading(false)
				window.location.reload()
			}
		})
			.catch(err => {
				setLoading(false)
				console.log(err)
				window.alert(err.response.data.message)
			})
	}
// получение данных для страницы
	useEffect(() => {
		setLoading(true)
		getData(data)
		
	}, [])

	
// сохранить фото
		const handleSaveImage = () => {
			if(editImageRef.current !== null) {
				const canvas = editImageRef.current.getImageScaledToCanvas()
				setSaveImage(canvas.toDataURL())
				setEditImageShow(false)
				setScale(1)
			} else {
				setImage(null)
				setSaveImage(null)
				setScale(1)
				setEditImageShow(false)
			}
		}
// Delete image 
	const handleRemoveImage = () => {
		setImage(null)
		  setSaveImage(null)
		  setScale(1)
	  }
// выгрузка изображения
	  const handleUploadImage = (event) => {
		try {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result)
			}
			reader.readAsDataURL(file)
		} catch (e) {
			console.log(e)
		}
	}
	// console.log(data) // проверка даты

// открытие редактора фото
	if (editImageShow) {
		return (
			<div className={'flex column'}>
				{image !== null ?
				<div style={{position: 'relative', backgroundColor: 'rgba(0,0,0,0.7)', display: 'inline-block', padding: 20}}>
					<AvatarEditor
						ref={(editor) => (editImageRef.current = editor)}
						image={image}
						width={250}
						height={250}
						border={50}
						borderRadius={150}
						color={[0, 0, 0, 0.5]} // RGBA
						scale={scale}
						rotate={rotate}
					/>
					<button className={'editModalImage-btn editModalRemove'}
									onClick={handleRemoveImage}>🗑</button>
					<button className={'editModalImage-btn editModalScalePlus'}
									onClick={()=> setScale(scale + 0.1)} disabled={scale >= 1.5}>+</button>
					{/* <button className={'editModalImage-btn editModalScalePlus'} 		хз почему он тут просто пусть будет
									onClick={()=> setScale(scale + 0.1)} disabled={scale >= 1.5}>+</button> */} 
					<button className={'editModalImage-btn editModalScaleMinus'}
									onClick={()=> setScale(scale - 0.1)} disabled={scale <= 1}>-</button>
					<button className={'editModalImage-btn editModalRotate'}
									onClick={()=> setRotate(rotate + 90)}>↺</button>
				</div> 
				: 
				<input type={'file'} accept={'image/png, image/jpeg'} onChange={handleUploadImage}/> 
				}
				<div className={'row mt-20'}>
					<button onClick={handleSaveImage}>Сохранить</button>
				</div>
			</div>
		)
	}
	if (data.id && data.id !== user.items.id) {
		// если есть значение data.id 
		// проблема такого перехода в том что в Network успевает поступить данные об этом пользователе Если там нет нужных, то это не критично
		return <Navigate to="/"></Navigate>
	}
	if (!loading) return <PreloaderComponent />
	return (
		<div className='editPAge'>
			<Back/>
			<div className="editProfile_avatar">
				<img src={saveImage !== null ? saveImage : avatarTemplate} alt="" className='editProfile_avatar-img'/>
				<button className='editProfile_avatar-span'  onClick={() => setEditImageShow(true)}>Изменить фото</button>
			</div>
			<form onSubmit={handleSubmit}>
			<div className="editProfile_form column items-center">
				<Input label={'Имя'} placeholder={'Введите имя'} value={firstName} onChangeValue={event => setFirstName(event)}/>
				<Input label={'Фамилия'} placeholder={'Введите фамилию'} value={lastName} onChangeValue={event => setLastName(event)}/>
				<Input label={'Почта'} placeholder={'Введите электронную почту'} value={email} onChangeValue={event => setEmail(event)}/>
				{/* <Input label={'Телефон'} placeholder={'Введите телефон'} value={phone} onChangeValue={event => setPhone(event)}/>  Убрал потому что маска нужна */} 
				<div className='input column'>
				<label htmlFor="" className='input_label'>Телефон</label>
				<InputMask  placeholder={'Введите телефон'} className='input_form usually' 
				value={phone} 
				mask="+7(999)999-99-99"
				onChange={event => setPhone(event.target.value)}/>
				</div>
			</div>
			<div className="editProfile_btns">
				<div className="editProfile_btn">
					<WhiteBtn onClick={handleCancle} size={'w-325px'} children={'Отмена'} />
				</div>
				<div className="editProfile_btn">
					<BlackBtn size={'w-325px'} children={'Сохранить'} btnType='submit' type={'white_text'}/>
				</div>
			</div>
			</form>
			
		</div>
	);
};



export default EditProfilePage;