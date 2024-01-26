import React from 'react';
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import search from "../asserts/icons/search.svg";
import filters from "../asserts/messages/setting.svg";
import ServiceItem from "../components/ServiceItem/ServiceItem";

const ServicePage = () => {
  return (
    <div className='servicePage'>
      <h1>Работа</h1>
      <Breadcrumbs/>
      <div className="categoryPage-header flex space-between">
        <div className='categoryPage_search flex items-center'>
          <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
          <img src={search} alt=""/>
        </div>
        <img src={filters} alt=""/>
      </div>

      <div className="servicePage_list">
        <ServiceItem/>
        <ServiceItem/>
        <ServiceItem/>
        <ServiceItem/>
        <ServiceItem/>
        <ServiceItem/>
      </div>

    </div>
  );
};

export default ServicePage;