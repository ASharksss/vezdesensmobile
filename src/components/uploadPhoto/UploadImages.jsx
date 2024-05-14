import {v4 as uuidv4} from 'uuid';
import React, {useState, useRef, useEffect} from 'react'
import {useDropzone} from 'react-dropzone';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import ModalTemplate from '../Modal/ModalTemplate';
import photoStandart from "../../asserts/icons/upload_stanrat.svg";
import deleteImg from "../../asserts/icons/deleteImg.svg";


const UploadImages = ({cropData, setCropData, mainSrcData = [], mainImage, setMainImage}) => {      // родительское хранилище, куда записываются изменения
  // cropData: []
  const cropperRef = useRef(null)
  const [srcData, setSrcData] = useState([])            // первоначальные файлы
  const [imageLimit, setImageLimit] = useState(false)   // проверка на ограничение фото
  const [changeImage, setChangeImage] = useState(null)  // измененная картинка
  const [croppedData, setCroppedData] = useState(null)  // изменяемая картинка
  const [activeModal, setActiveModal] = useState(false) // модальное окно
  const [key, setKey] = useState(null)                  // uuid картинки для изменения
  const [lastKey, setLastKey] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (mainSrcData.length > 0) {
      setSrcData(mainSrcData)
    }
  }, [mainSrcData])

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    const croppedCanvas = cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg')
    setCroppedData(croppedDataUrl)
  };

  const handleSetImage = (itemKey) => {
    setActiveModal(true)
    const object = srcData.find(item => item.key === itemKey)
    const index = srcData.findIndex(item => item.key === itemKey)
    setChangeImage(object.value)
    setKey(object.key)
    setImageIndex(index)
  }

  const handleSaveImage = () => {
    const updatedTimeArray = cropData.map(item => {
      if (item.key === key) {
        return {key: key, value: croppedData, change: true};
      }
      return item;
    });
    setCropData(updatedTimeArray);
    setChangeImage(null)
    setKey(null)
    setCroppedData(null)
    setActiveModal(false)
  }

  const handleNextImage = () => {
    if (imageIndex >= (srcData.length - 1)) {
      handleSetImage(srcData[0]['key'])
    } else {
      setImageIndex(imageIndex + 1)
      handleSetImage(srcData[imageIndex + 1]['key'])
    }
  }

  useEffect(() => {
    if (cropData.length >= 15)
      setImageLimit(true)
  }, [cropData])

  const onDrop = (acceptedFiles) => {
    if ((cropData.length + acceptedFiles.length) > 15) {
      return window.alert(`Превышвет допустимый предел картинок\nНа текущий момент у Вас ${cropData.length} файл(а)`)
    }
    if (acceptedFiles.length > 0) {
      acceptedFiles.map(item => {
        if (item.type !== 'image/jpeg' && item.type !== 'image/png' && item.type !== 'jpg') {
          return window.alert('Вы выбрали не правильный тип файла')
        }
        const reader = new FileReader()
        const img = new Image();
        reader.onloadend = () => {
          const v4Key = uuidv4()
          img.onload = function () {
            if (lastKey === null) {
              setLastKey(v4Key)
            }
            const imageSizeCheck = this.width === 248 && this.height === 333
            setSrcData(prev => [...prev, {key: v4Key, value: reader.result}])
            setCropData(prev => [...prev, {key: v4Key, value: reader.result, change: imageSizeCheck}])
          }
          img.src = reader.result
        }
        reader.readAsDataURL(item)
      })
    }
  };

  useEffect(() => {
    if (lastKey !== null) {
      handleSetImage(lastKey)
    }
  }, [lastKey])

  useEffect(() => {
    if (activeModal === false) {
      if (lastKey !== null) {
        setLastKey(null)
      }
      setChangeImage(null)
      setKey(null)
      setCroppedData(null)
      setActiveModal(false)
    }
  }, [activeModal])

  const handleRemoveImage = (itemKey) => {
    const timeArraySrc = [...srcData], timeArrayCrop = [...cropData]
    const updatedTimeArraySrc = timeArraySrc.filter(item => item.key !== itemKey)
    const updatedTimeArrayCrop = timeArrayCrop.filter(item => item.key !== itemKey)
    setSrcData([...updatedTimeArraySrc])
    setCropData([...updatedTimeArrayCrop])
    if (updatedTimeArrayCrop.length < 15)
      setImageLimit(false)
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {'image/*': []}})

  return (
    <div>
      <div>
        <p className='p-informaiton_block'>Выберите 1 фотографию, как основную, для отображения на главной странице </p>
        <p className='mb-20 p-text_style'>Количество загруженных фото: {srcData.length} / 15</p>
        <div className="images-flex">
          {cropData.length > 0 ? cropData.map((item) => (
            <div key={`img-${item.key}`} className='img_block'>
              <div className="flex handel_image">
              {mainImage !== null ?
                <div>
                  <input type="radio" id={`selected-${item.key}`} checked={item.key === mainImage}
                         className={`checkedImg_btn`} onChange={() => setMainImage(item.key)} hidden/>
                  <label className={`checkedImg_label${item.key === mainImage ? ' active' : ''}`}
                         htmlFor={`selected-${item.key}`}>{item.key === mainImage ? 'Выбрано' : 'Выбрать'}</label>
                </div> : null}
                <button onClick={() => handleRemoveImage(item.key)} className='deleteImg_stBtn'>
                  <img src={deleteImg} alt=""/>
                </button>
              </div>
              <div className='images-flex_column' onClick={() => handleSetImage(item.key)}>
                <img src={item.value} alt="" className='upload_photo-img'/>
              </div>
            </div>
          )) : null}
          {cropData.length < 15 ?
            <div {...getRootProps()}>
              <label htmlFor="standart_input" className='upload_file_input upload_standart-label'>
                <img src={photoStandart} alt=""/>
              </label>
            </div> : null}
        </div>


      </div>

      <input {...getInputProps()} disabled={imageLimit} className='upload-input'/>
      {
        isDragActive ?
          <p>Отпустите файл(ы)...</p> :
          /*<p style={{cursor: 'pointer'}}>Перетащите файл(ы) в эту зону или нажмите чтобы выбрать файл(ы)</p>*/
          <input {...getInputProps()} disabled={imageLimit} className='upload-input'/>
      }
      {(changeImage || activeModal) && (
        <ModalTemplate touched={false} activeModal={activeModal} setActiveModal={setActiveModal} children={
          <>
            <Cropper
              ref={cropperRef}
              src={changeImage}
              style={{height: 400}}
              guides={false}
              aspectRatio={248 / 333}
              cropBoxResizable={true}
              viewMode={1}
              dragMode='crop'
              crop={onCrop}
            />
            <button type='button' className='uploadPhoto-btn' onClick={() => handleSaveImage()}>Сохранить</button>
            <button type='button' className='uploadPhoto-btn-next'
                    onClick={() => handleNextImage()}>Дальше
            </button>
          </>}/>
      )}
    </div>
  );
};

export default UploadImages;
