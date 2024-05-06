import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import InputMask from 'react-input-mask';
import preview_standart from '../asserts/createCard/preview_standart.svg'
import preview_standartPlus from '../asserts/createCard/preview_standartPlus.svg'
import preview_vip from '../asserts/createCard/preview_vip.svg'
import preview_premium from '../asserts/createCard/preview_premium.svg'
import SizeBlock from "../components/CreateCardPage/SizeBlock";
import CheckboxInput from "../components/createInputs/checkboxInput";
import EnterInput from "../components/createInputs/enterInput";
import SelectInput from "../components/createInputs/selectInput";
import UploadImages from "../components/uploadPhoto/UploadImages";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import {DataURIToBlob, numberWithSpaces, STATIC_HOST} from "../utils";
import BookingCalc from "../components/bookingCalc/bookingCalc";
import {fetchBookingInfo} from "../redux/slices/bookingSlice";
import FullScreenModal from "../components/Modal/FullScreen/FullScreenModal";
import Geoposition from "../components/Geoposition/Geoposition";
import LoadGIF from '../asserts/load.gif'

const CreateCardPage = () => {

    let formData = new FormData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)

    const [categoriesArray, setCategoriesArray] = useState({
        category: [], subCategory: [], object: []
    })
    const [selectedCategoriesArray, setSelectedCategoriesArray] = useState({
        category: 0, subCategory: 0, object: 0
    })
    const [characterArray, setCharacterArray] = useState([])
    const [preview, setPreview] = useState({
        isOpen: true, name: "Стандарт"
    })
    const [selectedSize, setSelectedSize] = useState('Стандарт')
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [allAddress, setAllAddress] = useState(false)
    const [addressOpen, setAddressOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [phoneShow, setPhoneShow] = useState(0)
    const [price, setPrice] = useState('')
    const [bookingStartDate, setBookingStartDate] = useState(null)
    const [bookingEndDate, setBookingEndDate] = useState(null)
    const [position, setPosition] = useState('top')

    const [enterValue, setEnterValue] = useState([])
    const [selectValue, setSelectValue] = useState([])

    const [saveImages, setSaveImages] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [mainImage, setMainImage] = useState('')

    const [agreeOffers, setAgreeOffers] = useState(false)
    const [agreeRules, setAgreeRules] = useState(false)

    const handleChange = async (e) => {
        setSelectedCategoriesArray((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        if (e.target.name === 'category') {
            setSelectedCategoriesArray((prev) => ({
                ...prev,
                subCategory: 0,
                object: 0
            }))
        }
        if (e.target.name === 'subCategory') {
            setSelectedCategoriesArray((prev) => ({
                ...prev,
                object: 0
            }))
        }
    }

    useEffect(() => {
        setCharacterArray([])
        if (selectedCategoriesArray.category !== 0) {
            axios.get(`api/categories/getSubCategories?categoryId=${selectedCategoriesArray.category}`)
                .then(res => {
                    setCategoriesArray((prev) => ({
                        ...prev,
                        subCategory: res.data
                    }))
                })
        }
        if (selectedCategoriesArray.subCategory !== 0) {
            axios.get(`api/categories/getObjects?subCategoryId=${selectedCategoriesArray.subCategory}`)
                .then(res => {
                    setCategoriesArray((prev) => ({
                        ...prev,
                        object: res.data
                    }))
                })
        }
        if (selectedCategoriesArray.object !== 0) {
            axios.get(`api/characteristic/getCharacteristicObject?objectId=${selectedCategoriesArray.object}`)
                .then(res => {
                    setCharacterArray(res.data)
                })
        }
    }, [selectedCategoriesArray])

    useEffect(() => {
        const getCategories = async () => {
            await axios.get(`api/categories/getCategories`)
                .then(res => {
                    setCategoriesArray((prev) => ({
                        ...prev,
                        category: res.data.categories
                    }))
                })
        }
        document.title = 'Создание объявления'
        getCategories()
    }, [])

    const checkCorrectImage = () => {
        saveImages.map(item => {
            if (!item.change) {
                return false
            }
        })
        if (selectedSize !== 'Стандарт') {
            return previewImage.change
        } else {
            return true
        }
    }

    useEffect(() => {
        let typeAd = selectedSize === 'Стандарт' ? 'standart' : selectedSize === 'Стандарт +' ? 'standartPlus' : selectedSize === 'ВИП' ? 'vip' : 'premium'
        dispatch(fetchBookingInfo(typeAd))
        setPreviewImage(null)
        setAgreeOffers(false)
    }, [selectedSize])

    const handlePrice = (value) => {
        if (value.replace(/\s+/g, '') > 1500000000) {
            alert('Значение превышает норму')
        } else {
            const thousandPrice = numberWithSpaces(value.replace(/\s+/g, ''))
            setPrice(thousandPrice)
        }
    }

    const handleSetAddress = (city, region, district) => {
        setAddress(`${district}, ${region}, ${city}${allAddress ? '@Россия' : ''}`)
        setAddressOpen(false)
    }

    const handleAllAddress = (event) => {
        setAllAddress(event.target.checked)
        if (event.target.checked)
            setAddress(prevState => prevState + "@Россия")
        else
            setAddress(prevState => prevState.split('@')[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!agreeRules || (selectedSize !== 'Стандарт' && !agreeOffers))
            return window.alert('Примите соглашения перед созданием карты товара')
        if (saveImages.length === 0 || (previewImage === null && selectedSize !== 'Стандарт'))
            return window.alert('Прикрепите все нужные фотографии')
        const checkImages = checkCorrectImage()
        if (!checkImages) {
            return window.alert('Не все фотографии нужного размера')
        }
        if (mainImage === '') {
            return window.alert('Выберите основную фотографию')
        }
        if (!title) {
            return window.alert('Отсуствует заговловок')
        }
        if (selectedCategoriesArray.category === 0 || selectedCategoriesArray.subCategory === 0 || selectedCategoriesArray.object === 0) {
            return window.alert('Вы не выбрали категорию или подкатегорию')
        }
        let typeAd = selectedSize === 'Стандарт' ? 'standart' : selectedSize === 'Стандарт +' ? 'standartPlus' : selectedSize === 'ВИП' ? 'vip' : 'premium'
        setLoading(true)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('price', price.replace(/\s+/g, ''))
        formData.append('typeAd', typeAd)
        formData.append('objectId', selectedCategoriesArray.object)
        formData.append('showPhone', phoneShow)
        formData.append('bookingDateStart', new Date(bookingStartDate).toString())
        formData.append('bookingDateEnd', new Date(bookingEndDate).toString())
        formData.append('characteristicsInput', JSON.stringify(enterValue))
        formData.append('characteristicsSelect', JSON.stringify(selectValue))
        if (selectedSize !== 'Стандарт') {
            let commercial = DataURIToBlob(previewImage.value)
            formData.append('commercialImage', commercial)
            let preview = DataURIToBlob(saveImages.filter(item => item.key === mainImage)[0]['value'])
            formData.append('previewImage', preview)
            formData.append('position', position)
        } else {
            let preview = DataURIToBlob(saveImages.filter(item => item.key === mainImage)[0]['value'])
            formData.append('previewImage', preview)
        }
        saveImages.map((item) => {
            let image = DataURIToBlob(item.value)
            formData.append('images', image)
        })
        await axios({
            method: 'post',
            url: 'api/ad/createAd',
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        }).then((res) => {
            console.log(res.data)
            if (res.data.status === 403) {
                window.alert(res.data.message)
            } else {
                window.alert('Карточка успешна создана')
                setLoading(false)
                if (selectedSize !== 'Стандарт') {
                    window.location.href = res.data.ad?.payment?.href;
                    return null;
                } else {
                    return navigate(`/cardPage/${res.data.ad.id}`)
                }
            }
        })
            .catch(err => {
                console.log(err)
                window.alert(err.response.data.message)
            })
        setLoading(false)
    }

    return (
        <form className='createCard' onSubmit={handleSubmit}>
            {addressOpen ?
                <FullScreenModal activeModal={addressOpen} setActiveModal={setAddressOpen}><Geoposition
                    setShow={setAddressOpen}
                    handleAddress={handleSetAddress}/></FullScreenModal> : null}
            <h1 className='createCard-title'>Подать объявление</h1>
            <div className="createCard_categories">
                <h2 className='createCard_categories-subtitle'>Категория</h2>
                <div className="column">
                    <select className='createCard_categories-select' name='category'
                            value={selectedCategoriesArray.category}
                            onChange={handleChange}>
                        <option value={0} disabled={true}>Выберите подкатегорию...</option>
                        {
                            categoriesArray.category ? categoriesArray.category.map((item, index) => (
                                <option key={`category-${index}`}
                                        value={item.id}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</option>
                            )) : null
                        }
                    </select>
                    <select className='createCard_categories-select' name='subCategory'
                            value={selectedCategoriesArray.subCategory}
                            onChange={handleChange}>
                        <option value={0} disabled={true}>Выберите подкатегорию...</option>
                        {
                            categoriesArray.subCategory ? categoriesArray.subCategory.map((item, index) => (
                                <option key={`subcategory-${index}`}
                                        value={item.id}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</option>
                            )) : null
                        }
                    </select>
                    <select className='createCard_categories-select' name='object'
                            value={selectedCategoriesArray.object}
                            onChange={handleChange}>
                        <option value={0} disabled={true}>Выберите подкатегорию...</option>
                        {
                            categoriesArray.object ? categoriesArray.object.map((item, index) => (
                                <option key={`object-${index}`}
                                        value={item.id}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</option>
                            )) : null
                        }
                    </select>
                </div>
            </div>

            <div className='characteristic_item'>
                <label className='characteristic_item-label'>Заголоовок</label>
                <input onChange={e => setTitle(e.target.value)}
                       type="text" className='createCard_characteristics-input' required/>
            </div>
            <div className='characteristic_item'>
                <label className='characteristic_item-label'>Цена</label>
                <input value={price} onChange={event => handlePrice(event.target.value)}
                       type="text" className='createCard_characteristics-input' required
                       id='numericInput'
                />
            </div>
            {
                characterArray.length > 0 ?
                    <div className="createCard_characteristics">
                        <h2 className='createCard_characteristics-title'>Технические характеристики</h2>
                        {characterArray?.map((character, index) => {
                            if (character.characteristic.required) {
                                if (character.characteristic.typeCharacteristic.name === 'select') {
                                    return <SelectInput setSelectValue={setSelectValue} key={'select' + index}
                                                        isRequired={true}
                                                        data={character.characteristic}
                                                        id={character.characteristicId}/>
                                }
                                if (character.characteristic.typeCharacteristic.name === 'checkbox') {
                                    return <CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index}
                                                          isRequired={true}
                                                          data={character.characteristic}
                                                          id={character.characteristicId}/>
                                }
                                if (character.characteristic.typeCharacteristic.name === 'enter') {
                                    return <EnterInput setEnterValue={setEnterValue} key={'enter' + index}
                                                       data={character.characteristic}
                                                       id={character.characteristicId} isRequired={true}/>
                                }
                            }
                        })}
                        <h2 className='createCard_characteristics-title'>Дополнительные опции</h2>
                        {characterArray?.map((character, index) => {
                            if (!character.characteristic.required) {
                                if (character.characteristic.typeCharacteristic.name === 'select') {
                                    return <SelectInput setSelectValue={setSelectValue} key={'select' + index}
                                                        isRequired={true}
                                                        data={character.characteristic}
                                                        id={character.characteristicId}/>
                                }
                                if (character.characteristic.typeCharacteristic.name === 'checkbox') {
                                    return <CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index}
                                                          isRequired={false}
                                                          data={character.characteristic}
                                                          id={character.characteristicId}/>
                                }
                                if (character.characteristic.typeCharacteristic.name === 'enter') {
                                    return <EnterInput setEnterValue={setEnterValue} key={'enter' + index}
                                                       data={character.characteristic}
                                                       id={character.characteristicId} isRequired={false}/>
                                }
                            }
                        })}
                    </div>
                    : null
            }
            <h2 className='createCard_characteristics-title'>Описание</h2>
            <textarea className='createCard_textarea' placeholder="Опишите подробнее товар" required
                      onChange={e => setDescription(e.target.value)}></textarea>

            <h2 className='createCard_characteristics-title'>Размер объявления</h2>
            <div className="createPage_size">
                <div className="createPage_size-standart">
                    <SizeBlock name={'Стандарт'} price={'Бесплатно'} preview={preview} setPreview={setPreview}
                               preview_image={preview_standart} setSelectedSize={setSelectedSize}
                               description={'Размер изображения 248 на 233 пикселей. Показывается в течение 30 дней, после чего его\n' +
                                   '                  можно заново запустить. Таких объявлений большинство. Бронирования не требует.'}/>
                    <SizeBlock name={'Стандарт +'} price={'4 р в сутки'} setPreview={setPreview} preview={preview}
                               description={'Размер изображения 315 на 417 пикселей. Требует бронирования,\n' +
                                   '                  указываются дата начала и конца показов. Далее рассчитывается по формуле:\n' +
                                   '                 Итоговая стоимость = рубли в сутки * количество дней.\n' +
                                   '                  В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования объявление станет\n' +
                                   '                  стандартным.'} preview_image={preview_standartPlus}
                               setSelectedSize={setSelectedSize}/>
                    <SizeBlock name={'ВИП'} price={'8 р в сутки'} setSelectedSize={setSelectedSize}
                               description={'Размер изображения 690 на 417 пикселей. Требует бронирования,\n' +
                                   '                  указываются дата начала и конца показов. Далее рассчитывается по формуле:\n' +
                                   '                  Итоговая стоимость = рубли в сутки * количество дней.\n' +
                                   '                  В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования объявление станет\n' +
                                   '                  стандартным'} preview={preview} setPreview={setPreview}
                               preview_image={preview_vip}/>
                    <SizeBlock name={'Премиум'} preview={preview} preview_image={preview_premium}
                               setPreview={setPreview}
                               description={'Размер изображения 1400 на 417 пикселей. Всего 2 таких\n' +
                                   '                  объявления – верхний и нижний. Расположены на самом верху. Требует бронирования указываются дата\n' +
                                   '                  начала и конца показов. Далее рассчитывается по формуле:\n' +
                                   '                  Итоговая стоимость = рубли в сутки * количество дней.\n' +
                                   '                  В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования объявление станет\n' +
                                   '                  стандартным.'} price={'30 р в сутки'}
                               setSelectedSize={setSelectedSize}/>

                    {selectedSize !== 'Стандарт' ?
                        <BookingCalc selectedSize={selectedSize} setBookingEndDate={setBookingEndDate}
                                     setBookingStartDate={setBookingStartDate} position={position}
                                     bookingDateStart={bookingStartDate} setPosition={setPosition}
                                     bookingDateEnd={bookingEndDate}/> : null}

                    {preview.name !== '' &&
                        <div className="upload_photo">
                            <h1 className='upload_photo-h1'>Загрузка фото</h1>
                            {preview.name === 'Премиум' ?
                                <UploadPhotoPremium editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                                preview.name === 'ВИП' ?
                                    <UploadPhotoVip editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                                    preview.name === 'Стандарт +' ?
                                        <UploadPhotoStandartPlus editedImage={previewImage}
                                                                 setEditedImage={setPreviewImage}/> : null
                            }
                        </div>}
                    <span className='upload_photo-title'>Загрузите основные фотографии</span>
                    <div>
                        <UploadImages cropData={saveImages} setCropData={setSaveImages}
                                      mainImage={mainImage}
                                      setMainImage={setMainImage}/>
                    </div>

                </div>
            </div>

            <div className='characteristic_item'>
                <label className='characteristic_item-label'>Метоположение</label>
                <div onClick={() => setAddressOpen(true)} className='createCard_characteristics-input'>
                    {address}</div>
            </div>
            {(user.items?.isCompany === 1 && address !== '') ?
                <div className='flex created_ad-radio mt-20'>
                    <input type="checkbox" id='only_messages' name='only_messages' checked={allAddress}
                           onChange={handleAllAddress}
                           className='mob-input'
                    />
                    <label htmlFor="only_messages" className='create_ad-contact'>По всей России</label>
                </div>
                : null}
            <div className="create_ad-descr">
                <h1 className='characteristic_item-label'>Контакты</h1>
                <div className="flex column">
                    <label htmlFor="" className='create_ad_label'>Телефон</label>
                    <div>
                        <InputMask mask="+7(999)999-99-99" type="text" value={user.items.phone} disabled
                                   placeholder='Введите номер' className='createCard_characteristics-input'/>
                        <form className="flex column created_ad-contact">
                            <div className='flex created_ad-radio'>
                                <input type="radio" id='only_messages' name='only_messages' value={2}
                                       checked={phoneShow === 2}
                                       onChange={event => setPhoneShow(parseInt(event.target.value))}
                                       className='mob-input'
                                />
                                <label htmlFor="only_messages" className='create_ad-contact'>Только сообщения</label>
                            </div>
                            <div className="flex created_ad-radio">
                                <input type="radio" id='only_calls' name='only_calls' value={1}
                                       checked={phoneShow === 1}
                                       onChange={event => setPhoneShow(parseInt(event.target.value))}
                                       className='mob-input'
                                />
                                <label htmlFor="only_calls" className='create_ad-contact'>Только звонки</label>
                            </div>
                            <div className="flex created_ad-radio">
                                <input type="radio" id='messages_and_calls' name='messages_and_calls' value={0}
                                       checked={phoneShow === 0}
                                       onChange={event => setPhoneShow(parseInt(event.target.value))}
                                       className='mob-input'
                                />
                                <label htmlFor="messages_and_calls" className='create_ad-contact'>Звонки и
                                    сообщения</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex created_ad-radio">
                    <input type="checkbox" id='agreeRules' name='agreeRules'
                           onChange={() => setAgreeRules(prevState => !prevState)}
                           className='mob-input' value={agreeRules}
                    />
                    <label htmlFor="agreeRules" className='create_ad-contact'>
						<span>
							Я ознакомился с <u><Link
                            to={`${STATIC_HOST}/docs/Rules_for_publication_of_information_by_user_on_the_vezdesens.pdf`}
                            target={'_blank'}>правилами публикации на сайте</Link></u>
						</span>
                    </label>
                </div>
                {selectedSize !== 'Стандарт' ?
                    <div className="flex created_ad-radio">
                        <input type="checkbox" id='agreeOffers' name='agreeOffers'
                               onChange={() => setAgreeOffers(prevState => !prevState)}
                               className='mob-input' value={agreeOffers}
                        />
                        <label htmlFor="agreeOffers" className='create_ad-contact'>
						<span>
							Я ознакомился с <u><Link to={`${STATIC_HOST}/docs/Offer_for_site_vezdesens.pdf`}
                                                  target={'_blank'}>офертой сайта</Link></u>
						</span>
                        </label>
                    </div> : null}
            </div>
            <button
                className={`create_ad_btn${!agreeRules || (selectedSize !== 'Стандарт' && !agreeOffers) ? ' disabled' : ''}`}
                type='submit' disabled={!agreeRules || (selectedSize !== 'Стандарт' && !agreeOffers) || loading}>
                {loading ? <><img src={LoadGIF} width={32} alt={"Отправка"}/> Отправка...</> : 'Разместить'}
            </button>
        </form>
    );
};

export default CreateCardPage;