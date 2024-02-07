import React, {useEffect, useState} from 'react';
import SelectFilter from "../ui/filterComponents/selectFilter";
import Back from "../ui/Back";
import EnterFilter from "../ui/filterComponents/enterFilter";
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import CreateEnterFilter from "../ui/filterComponents/createEnterFilter";
import axios from "axios";

const CreateCardPage = () => {

  const [dataCategories, setDataCategories] = useState([])
  const [dataSubCategories, setDataSubCategories] = useState([])
  const [dataObject, setDataObject] = useState([])

  const [loading, setLoading] = useState(true)

  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [object, setObject] = useState(null)

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

  useEffect(() => {
    getDataObject()
    setLoading(false)
  }, [subCategory])

  useEffect(() => {
    getDataSubCategories()
    setLoading(false)
  }, [category])

  useEffect(() => {
    getDataCategories()
    setLoading(false)
  }, [])


  console.log(category)

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
      <SelectFilter data={dataCategories} setValue={setCategory} value={category?.name}/>
      <SelectFilter data={dataSubCategories} setValue={setSubCategory} value={subCategory?.name}/>
      <SelectFilter data={dataObject} setValue={setObject} value={object?.name}/>

      <div className="required technical_characteristic">
        <h1 className='createCard-char_title'>Обязательные характеристики</h1>
        <CreateEnterFilter/>
        <SelectFilter/>
        <CheckboxFilter/>
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