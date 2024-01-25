import React from 'react';
import Back from "../ui/Back";
import CategoryList from "../components/CategoryList/CategoryList";

const SubCategoryPage = () => {
  return (
    <div className='subCategory'>
      <div className="subCategory_header flex items-center">
        <Back/>
        <h1 className='subCategory_header-title'>Транспорт</h1>

      </div>
      <div className="category_list">
        <CategoryList/>
        <CategoryList/>
        <CategoryList/>
      </div>

    </div>
  );
};

export default SubCategoryPage;