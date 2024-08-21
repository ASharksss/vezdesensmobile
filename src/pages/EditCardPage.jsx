import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {DataURIToBlob, numberWithSpaces, STATIC_HOST} from "../utils";
import LoadGIF from "../asserts/load.gif";
import EnterInput from "../components/createInputs/enterInput";
import SelectInput from "../components/createInputs/selectInput";
import CheckboxInput from "../components/createInputs/checkboxInput";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import UploadImages from "../components/uploadPhoto/UploadImages";
import BlackBtn from "../ui/BlackBtn";

const EditCardPage = () => {
    const {id} = useParams();
    const imagesRef = useRef(null)
    let formData = new FormData()
    const navigate = useNavigate()

    const [cardData, setCardData] = useState({})
    const [saveImages, setSaveImages] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const [mainImage, setMainImage] = useState('')
    const [exception, setException] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [characteristicData, setCharacteristicData] = useState([])
    const [adCharacteristic, setAdCharacteristic] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [enterValue, setEnterValue] = useState([])
    const [selectValue, setSelectValue] = useState([])

    const handleGetInfo = async () => {
        setLoadingPage(true)
        await axios.get(`api/ad/getEditAd/${id}`)
            .then(res => {
                setCardData(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setPrice(numberWithSpaces(res.data.price))
                setCharacteristicData(res.data.object.characteristicObject)
                setAdCharacteristic([res.data.adCharacteristicInputs, res.data.adCharacteristicSelects])
                setMainImage(res.data.previewImageAds[0].name)
                return res.data
            })
            .catch(err => {
                setException(true)
                setLoadingPage(false)
            })
    }

    const handlePrice = (value) => {
        if (value.replace(/\s+/g, '') > 1500000000) {
            alert('Значение превышает норму')
        } else {
            const thousandPrice = numberWithSpaces(value.replace(/\s+/g, ''))
            setPrice(thousandPrice)
        }
    }

    const toDataURL = name => fetch(`${STATIC_HOST}/${name}`)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    useEffect(() => {
        if (adCharacteristic.length > 0) {
            const timeArray = characteristicData || []
            const groupByCharacteristicId = adCharacteristic[1].reduce((acc, {characteristic, characteristicValue}) => {
                const id = characteristic.id;
                const valueId = characteristicValue.id;
                if (!acc[id]) {
                    acc[id] = [];
                }
                acc[id].push(valueId);
                return acc;
            }, {});
            timeArray.map((state) => {
                adCharacteristic[0].map(item => {
                    if (item.characteristic.id === state.characteristicId) {
                        state['value'] = item.value
                    }
                })
                Object.keys(groupByCharacteristicId).forEach(function (key, value) {
                    if (parseInt(key) === state.characteristicId) {
                        if (state.characteristic.typeCharacteristic.name === 'select')
                            state['value'] = groupByCharacteristicId[key][0]
                        else
                            state['value'] = groupByCharacteristicId[key]
                    }
                });
            })
            setCharacteristicData(timeArray)
            setLoadingPage(false)
            cardData.imageAds.map(item => {
                toDataURL(item.name).then(async dataUrl => {
                    setSaveImages(prevState => [...prevState, {key: item.name, value: dataUrl}])
                })
            })
            if (cardData.typeAdId !== 1) {
                cardData.commercialImageAds.length > 0 && cardData.commercialImageAds.map(item => {
                    toDataURL(item.name).then(dataUrl => {
                        setPreviewImage({change: false, value: dataUrl})
                    })
                })
            }
        }
    }, [adCharacteristic])

    useEffect(() => {
        document.title = `Редактирование`
        handleGetInfo()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (mainImage === '') {
            imagesRef.current.scrollIntoView({behavior: 'smooth'})
            return window.alert('Выберите основную фотографию')
        }

        setLoading(true)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price.replace(/\s+/g, ''))
        formData.append('characteristicsInput', JSON.stringify(enterValue))
        formData.append('characteristicsSelect', JSON.stringify(selectValue))
        if (cardData.typeAdId !== 1) {
            let commercial = DataURIToBlob(previewImage.value)
            formData.append('commercialImage', commercial)
            let preview = DataURIToBlob(saveImages.filter(item => item.key === mainImage)[0]['value'])
            formData.append('previewImage', preview)
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
            url: 'api/ad/editAd/' + id,
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        }).then((res) => {
            if (res.data.status === 403) {
                window.alert(res.data.message)
            } else {
                setLoading(false)
                navigate(`/cardPage/${id}`)
                window.location.reload()
            }
        })
            .catch(err => {
                console.log(err)
                window.alert(err.response.data.message)
            })
        setLoading(false)
    }

    if (exception) {
        return (
            <div className={'container'}>
                <p>Нет доступа к редактированию карточки</p>
            </div>
        )
    }

    const additional_options = characteristicData.length > 0 ? characteristicData.filter(item => !item['characteristic']['required']).length : 0

    return (
        <form className='createCard' onSubmit={handleSubmit}>
            <h1 className='createCard-title'>Редактирование</h1>
            <div className="createCard_categories">
                <div className='characteristic_item'>
                    <label className='createCard_categories-subtitle'>Заголоовок</label>
                    <input onChange={e => setTitle(e.target.value)} value={title}
                           type="text" className='createCard_characteristics-input' required/>
                </div>
                <div className='characteristic_item'>
                    <label className='createCard_categories-subtitle'>Цена</label>
                    <input value={price} onChange={event => handlePrice(event.target.value)}
                           type="text" className='createCard_characteristics-input' required
                           id='numericInput'
                    />
                </div>
                <div className="createCard_characteristics">
                    <h2 className='createCard_characteristics-title'>Технические характеристики</h2>
                    {characteristicData.length > 0 &&
                        characteristicData.map((item, index) => (item['characteristic']['required'] ?
                                <React.Fragment key={`main-${index}`}>
                                    {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                                        <EnterInput setEnterValue={setEnterValue}
                                                    key={'enter' + item['characteristicId'] + index}
                                                    data={item['characteristic']}
                                                    id={item['characteristicId']} isRequired={true}
                                                    mainValue={item['value']}/>}
                                    {item['characteristic']['typeCharacteristic']['name'] === 'select' &&
                                        <SelectInput setSelectValue={setSelectValue}
                                                     key={'select' + item['characteristicId'] + index}
                                                     isRequired={true}
                                                     data={item['characteristic']} id={item['characteristicId']}
                                                     mainValue={item['value']}/>}
                                    {item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
                                        <CheckboxInput setCheckboxValue={setSelectValue}
                                                       key={'checkbox' + item['characteristicId'] + index}
                                                       isRequired={true}
                                                       data={item['characteristic']} id={item['characteristicId']}
                                                       mainValue={item['value']}/>}
                                </React.Fragment> : null
                        ))
                    }
                    {additional_options > 0 ?
                        <>
                            <h2 className='createCard_characteristics-title'>Дополнительные опции</h2>
                            {characteristicData.length > 0 &&
                                characteristicData.map((item, index) => (!item['characteristic']['required'] ?
                                        <React.Fragment key={`additionally-${index}`}>
                                            {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                                                <EnterInput setEnterValue={setEnterValue}
                                                            key={'enter' + item['characteristicId'] + index}
                                                            data={item['characteristic']}
                                                            id={item['characteristicId']} isRequired={false}
                                                            mainValue={item['value']}/>}
                                            {item['characteristic']['typeCharacteristic']['name'] === 'select' &&
                                                <SelectInput setSelectValue={setSelectValue}
                                                             key={'select' + item['characteristicId'] + index}
                                                             isRequired={false}
                                                             data={item['characteristic']} id={item['characteristicId']}
                                                             mainValue={item['value']}/>}
                                            {item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
                                                <CheckboxInput setCheckboxValue={setSelectValue}
                                                               key={'checkbox' + item['characteristicId'] + index}
                                                               isRequired={false}
                                                               data={item['characteristic']}
                                                               id={item['characteristicId']}
                                                               mainValue={item['value']}/>}
                                        </React.Fragment> : null
                                ))
                            }
                        </>
                        : null}
                </div>
                <div className="createCard_characteristics">
                    <h2 className='createCard_characteristics-title'>Описание</h2>
                    <textarea onChange={event => setDescription(event.target.value)}
                              value={description} className='createCard_textarea'
                              placeholder='Опишите подробнее товар' required/>
                </div>
                {
                    cardData.typeAdId === 4 ?
                        <UploadPhotoPremium editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                        cardData.typeAdId === 3 ?
                            <UploadPhotoVip editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                            cardData.typeAdId === 2 ? <UploadPhotoStandartPlus editedImage={previewImage}
                                                                               setEditedImage={setPreviewImage}/> : null
                }
                <div ref={imagesRef}>
                    <UploadImages cropData={saveImages} setCropData={setSaveImages} mainSrcData={saveImages}
                                  mainImage={mainImage} setMainImage={setMainImage}/>
                </div>
                <div className="createCard_characteristics">
                    <BlackBtn btnType={'submit'} size={'w-100P'} >
                        {loading ?
                            <div className="flex"><img src={LoadGIF} width={32} alt={"Отправка"}/> Отправка...
                            </div> : 'Сохранить'}
                    </BlackBtn>
                </div>
            </div>
        </form>
    );
};

export default EditCardPage;