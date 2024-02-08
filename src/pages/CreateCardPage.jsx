import React, {useEffect, useState} from 'react';
import SelectFilter from "../ui/filterComponents/selectFilter";
import Back from "../ui/Back";
import EnterFilter from "../ui/filterComponents/enterFilter";
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import CreateEnterFilter from "../ui/filterComponents/createEnterFilter";
import axios from "axios";
import ModalTemplate from "../components/Modal/ModalTemplate";
import SelectFilterPage from "./SelectFilterPage";

const CreateCardPage = () => {

  const [dataCategories, setDataCategories] = useState([])
  const [dataSubCategories, setDataSubCategories] = useState([])
  const [dataObject, setDataObject] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [enter, setEnter] = useState('')
  const [input, setInput] = useState('')

  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [object, setObject] = useState(null)
  const [characteristic, setCharacteristic] = useState(null)

  const getDataCategories = async () => {
    await axios.get(`api/categories/getCategories`)
      .then(res => setDataCategories(res.data.categories))
  }

  const getDataSubCategories = async () => {
    await axios.get(`api/categories/getSubCategories?categoryId=${category?.id}`)
      .then(res => setDataSubCategories(res.data))
  }

  const getDataObject = async () => {
    await axios.get(`api/categories/getObjects?subCategoryId=${subCategory?.id}`)
      .then(res => setDataObject(res.data))
  }

  const getDataCharacteristic = async () => {
    await axios.get(`api/characteristic/getCharacteristicObject?objectId=${object?.id}`)
      .then(res => setCharacteristic(res.data))
  }

  useEffect(() => {
    getDataCategories()
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(false)
    setOpen(false)
    getDataSubCategories()
  }, [category])

  useEffect(() => {
    getDataObject()
    setOpen(false)
    setLoading(false)
  }, [subCategory])

  useEffect(() => {
    getDataCharacteristic()
    setOpen(false)
    setLoading(false)
  }, [object])

  if (loading) {
    return <div>
      loading...
    </div>
  }
  return (
    <div className='createCard'>
      <div className="flex items-center">
        <Back/>
        <h1 className='createCard-title'>Подать объявление</h1>
      </div>
      <h2 className='createCard-subtitle'>Категория</h2>

      {/*<div className='filter_item'>/!**/}
      {/*  <label className='enterFilter-title'>Название</label>*!/*/}
      {/*  <div className='selectInput' onClick={() => setOpen(true)}>*/}
      {/*    {category ? category : 'Выберите значение...'}*/}
      {/*  </div>*/}
      {/*  {*/}
      {/*    open ?*/}
      {/*      <ModalTemplate activeModal={open} setActiveModal={setOpen}*/}
      {/*                     children={<SelectFilterPage/> }/>*/}
      {/*      : null*/}
      {/*  }*/}
      {/*</div>*/}

      <SelectFilter data={dataCategories} setValue={setCategory} value={category?.name} type={'radio'}/>
      <SelectFilter data={dataSubCategories} setValue={setSubCategory} value={subCategory?.name} type={'radio'}/>
      <SelectFilter data={dataObject} setValue={setObject} value={object?.name} type={'radio'}/>

      <div className="required technical_characteristic">
        <h1 className='createCard-char_title'>Обязательные характеристики</h1>
        <CreateEnterFilter item={{name: 'Название'}} setValue={setEnter}/>

        {
          characteristic?.map((item) => item.characteristic.required && (
            <>
              {item.characteristic.typeCharacteristic.name === 'enter' &&
                <CreateEnterFilter item={item.characteristic} setValue={setEnter}/>}
              {item.characteristic.typeCharacteristic.name === 'checkbox' &&
                <CheckboxFilter item={item.characteristic.characteristicValues} type={'checkbox'} setValue={setInput}/>}
              {item.characteristic.typeCharacteristic.name === 'select' &&
                <SelectFilter data={item.characteristic.characteristicValues} type={'radio'} setValue={setInput}/> }
            </>
          ))
        }

      </div>

      <div className="additionally technical_characteristic">
        <h1 className='createCard-char_title'>Дополнительные характеристики</h1>
        <CreateEnterFilter/>
        <SelectFilter/>
        <CheckboxFilter/>
      </div>

      <div className="descriptionCard">
        <h1 className='descriptionCard-title'>Описание</h1>
        <textarea className='createCard_description' placeholder='Опишите подробнее товар'/>
      </div>

      <div className="sizeCard">
        <h1 className='descriptionCard-title'>Размер объявления</h1>
      </div>

    </div>
  );
};

export default CreateCardPage;