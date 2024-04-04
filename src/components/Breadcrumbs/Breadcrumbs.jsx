import React from 'react';
import {Link, NavLink} from "react-router-dom";

const Breadcrumbs = ({data}) => {
  return (
    <div className='breadcrumbs'>
      <Link to={`/subCategory/${data?.subCategory.category.id}`}>{data?.subCategory.category.name}</Link> / <Link to={`/subCategory/${data?.subCategory.category.id}/${data?.subCategory.id}`}>{data?.subCategory.name.indexOf('/') > 0 ? data?.subCategory.name.split('/')[1] : data?.subCategory.name}</Link> / <Link to={`/categoryPage/${data?.id}`}>{data?.name.indexOf('/') > 0 ? data?.name.split('/')[1] : data?.name}</Link>
    </div>
  );
};

export default Breadcrumbs;
