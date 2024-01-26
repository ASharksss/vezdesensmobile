import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import filters from '../asserts/messages/setting.svg'
import search from '../asserts/icons/search.svg'
import Card from "../components/Card/Card";
import Long from "../components/Card/Long";
import './pages.css'

const CategoryPage = () => {
  return (
    <div className='categoryPage'>
      <h1>Животные</h1>
      <Breadcrumbs/>
      <div className="categoryPage-header flex space-between">
        <div className='categoryPage_search flex items-center'>
          <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
          <img src={search} alt=""/>
        </div>
        <img src={filters} alt=""/>
      </div>


      <div className="categoryPage_list">
        <div className="grid">
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
          <Card classname={'xs'}/>
        </div>
        <Long/>
        <div className="grid">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <Card classname={'l'}/>
      </div>

    </div>
  );
};

export default CategoryPage;