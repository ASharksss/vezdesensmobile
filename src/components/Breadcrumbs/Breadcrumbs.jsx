import React from 'react';

const Breadcrumbs = ({data}) => {
  return (
    <div>
      {data?.subCategory.category.name} / {data?.subCategory.name.indexOf('/') > 0 ? data?.subCategory.name.split('/')[1] : data?.subCategory.name} / {data?.name.indexOf('/') > 0 ? data?.name.split('/')[1] : data?.name}
    </div>
  );
};

export default Breadcrumbs;
