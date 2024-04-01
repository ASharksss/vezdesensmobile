import React, {useEffect, useState} from 'react';
import axios from "axios";
import preview_standart from '../asserts/createCard/preview_standart.svg'


const CreateCardPage = () => {
  const [categoriesArray, setCategoriesArray] = useState({
    category: [], subCategory: [], object: []
  })
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState({
    category: 0, subCategory: 0, object: 0
  })
  const [characterArray, setCharacterArray] = useState([])
  const [preview, setPreview] = useState({
    isOpen: false, name: null
  })

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
          console.log(res.data)
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


  console.log(characterArray)

  return (
    <div className='createCard'>
      <h1 className='createCard-title'>Подать объявление</h1>
      <div className="createCard_categories">
        <h2 className='createCard_categories-subtitle'>Категория</h2>
        <div className="column">
          <select className='createCard_categories-select' name='category' value={selectedCategoriesArray.category}
                  onChange={handleChange}>
            <option value={0} disabled={true}>Выберите подкатегорию...</option>
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

      {
        characterArray.length > 0 ?
          <div className="createCard_characteristics">
            <h2 className='createCard_characteristics-title'>Технические характеристики</h2>
            {characterArray?.map(character => {
              if (character.characteristic.required) {
                if (character.characteristic.typeCharacteristic.name === 'select') {
                  return (
                    <div className='characteristic_item'>
                      <label className='characteristic_item-label'>{character.characteristic.name}</label>
                      <select className='createCard_select'>
                        <option value={0}>-</option>
                        {
                          character.characteristic.characteristicValues.map(value => (
                            <option value={value.id}>{value.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  )
                }
                if (character.characteristic.typeCharacteristic.name === 'checkbox') {
                  return (
                    <div className='characteristic_item'>
                      <p className='characteristic_item-label'>{character.characteristic.name}</p>
                      <label>{
                        character.characteristic.characteristicValues.map(value => (
                          <div className='characteristic_item-values '>
                            <input className='characteristic_item-checkbox' type="checkbox" value={value.id}/>
                            <label className='characteristic_item-text' id={value.id}>{value.name}</label>
                          </div>
                        ))
                      }</label>
                    </div>
                  )
                }
                if (character.characteristic.typeCharacteristic.name === 'enter') {
                  return (
                    <div className='characteristic_item'>
                      <label className='characteristic_item-label'>{character.characteristic.name}</label>
                      <input type="text" className='createCard_characteristics-input'/>
                    </div>
                  )
                }
              }
            })}
            <h2 className='createCard_characteristics-title'>Дополнительные опции</h2>
            {characterArray?.map(character => {
              if (!character.characteristic.required) {
                if (character.characteristic.typeCharacteristic.name === 'select') {
                  return (
                    <div className='characteristic_item'>
                      <label className='characteristic_item-label'>{character.characteristic.name}</label>
                      <select className='createCard_select'>
                        <option value={0} disabled>-</option>
                        {
                          character.characteristic.characteristicValues.map(value => (
                            <option value={value.id}>{value.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  )
                }
                if (character.characteristic.typeCharacteristic.name === 'checkbox') {
                  return (
                    <div className='characteristic_item'>
                      <label>{character.characteristic.name}</label>
                      <select className='createCard_select'>
                        <option value="" disabled>-</option>
                        {
                          character.characteristic.characteristicValues.map(value => (
                            <option value={value.id}>{value.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  )
                }
                if (character.characteristic.typeCharacteristic.name === 'enter') {
                  return (
                    <div className='characteristic_item'>
                      <label className='characteristic_item-label'>{character.characteristic.name}</label>
                      <input type="text" className='createCard_characteristics-input'/>
                    </div>
                  )
                }
              }
            })}
          </div>
          : null
      }
      <h2 className='createCard_characteristics-title'>Описание</h2>
      <textarea className='createCard_textarea' placeholder="Опишите подробнее товар"></textarea>

      <h2 className='createCard_characteristics-title'>Размер объявления</h2>
      <div className="createPage_size">
        <div className="createPage_size-standart">
          <div className="flex items-center">
            <input type="checkbox" className='size_standart-checkbox'/>
            <div>
              <div className="flex items-center">
                <span className='size_standart-name'>Стандарт</span>
                <span className='size_standart-price'>Бесплатно</span>
              </div>
              <p className='size_standart-description'>Размер изображения 248 на 233 пикселей. Показывается в течение 30
                дней, после чего его
                можно заново запустить. Таких объявлений большинство. Бронирования не требует.</p>
              <p className='size_standart-btn' onClick={() => {
                setPreview({isOpen: !preview.isOpen, name: 'standart'})
              }}>
                Предпросмотр</p>
            </div>
          </div>
          {
            preview.isOpen && preview.name === 'standart' ?
              <img src={preview_standart} alt="" className='size_standart-preview'/>
              : null
          }

        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;