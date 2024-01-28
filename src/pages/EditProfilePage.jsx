import React from 'react';
import Back from "../ui/Back";
import avatar from '../asserts/on.jpg'
import Input from "../ui/input";

const EditProfilePage = () => {
	return (
		<div className='editPAge'>
			<Back/>
			<div className="editProfile_avatar">
				<img src={avatar} alt="" className='editProfile_avatar-img'/>
				<span className='editProfile_avatar-span'>Изменить фото</span>
			</div>
			<div className="editProfile_form column items-center">
				<Input label={'Имя'} placeholder={'Введите имя'}/>
				<Input label={'Фамилия'} placeholder={'Введите фамилию'}/>
				<Input label={'Почта'} placeholder={'Введите электронную почту'}/>
				<Input label={'Телефон'} placeholder={'Введите телефон'}/>
			</div>
			<div className="editProfile_btns">

			</div>
		</div>
	);
};

export default EditProfilePage;