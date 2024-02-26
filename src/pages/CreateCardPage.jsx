import React, {useEffect, useState} from 'react';
import axios from "axios";

const CreateCardPage = () => {
  const [categoriesArray, setCategoriesArray] = useState({
    category: [], subCategory: [], object: []
  })
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState({
    category: 0, subCategory: 0, object: 0
  })

  const handleChange = async (e) => {
    setSelectedCategoriesArray((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
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
    getCategories()
  }, [])


  console.log(selectedCategoriesArray)

  return (
    <div className='createCard'>
      <h1 className='createCard-title'>Подать объявление</h1>
      <div className="createCard_categories">
        <h2 className='createCard_categories-subtitle'>Категория</h2>
        <div className="column">
          <select className='createCard_categories-select' name='category' value={selectedCategoriesArray.category}
                  onChange={handleChange}>
            <option value={0} disabled>Выберите подкатегорию...</option>
            {
              categoriesArray.category ? categoriesArray.category.map((item, index) => (
                <option key={`category-${index}`} value={item.id}>{item.name}</option>
              )) : null
            }
          </select>
          <select className='createCard_categories-select' name='subCategory'
                  value={selectedCategoriesArray.subCategory}
                  onChange={handleChange}>
            <option value={0} disabled={true}>Выберите подкатегорию...</option>
            {
              categoriesArray.subCategory ? categoriesArray.subCategory.map((item, index) => (
                <option key={`subcategory-${index}`} value={item.id}>{item.name}</option>
              )) : null
            }
          </select>
          <select className='createCard_categories-select' name='object' value={selectedCategoriesArray.object}
                  onChange={handleChange}>
            <option value={0} disabled={true}>Выберите подкатегорию...</option>
            {
              categoriesArray.object ? categoriesArray.object.map((item, index) => (
                <option key={`object-${index}`} value={item.id}>{item.name}</option>
              )) : null
            }
          </select>
        </div>
      </div>
      <div className="createCard_characteristics">
        <h2>Технические характеристики</h2>
        <h2>Дополнительные опции</h2>
      </div>
    </div>
  );
};

export default CreateCardPage;