import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Breadcrumbs = ({categoryId, subCategoryId, objectId, data = null}) => {
    const {breadcrumb} = useSelector(state => state.categoryFilter)
    if (data !== null) {
        const categoryId = data?.subCategory.category.id
        const subCategoryId = data?.subCategory.id
        return (
            <div className='breadcrumbs'>
                <Link
                    to={`/subCategory/${categoryId}`}>{data?.subCategory.category.name}</Link> / <Link
                to={`/subCategory/${categoryId}/${subCategoryId}`}>{data?.subCategory.name.indexOf('/') > 0 ? data?.subCategory.name.split('/')[1] : data?.subCategory.name}</Link> / <Link
                to={`/categoryPage/${categoryId}/${subCategoryId}/${data?.id}`}>{data?.name.indexOf('/') > 0 ? data?.name.split('/')[1] : data?.name}</Link>
            </div>
        );
    }
    const subCategoryName = breadcrumb.subCategories.filter(item => item.id === subCategoryId)[0]
    const objectName = subCategoryName.objects.filter(item => item.id === objectId)[0].name
    return (
        <div className='breadcrumbs'>
            <Link
                to={`/subCategory/${categoryId}`}>{breadcrumb.name}</Link> / <Link
            to={`/subCategory/${categoryId}/${subCategoryId}`}>{subCategoryName.name.indexOf('/') > 0 ? subCategoryName.name.split('/')[0] : subCategoryName.name}</Link> / <Link
            to={`/categoryPage/${categoryId}/${subCategoryId}/${objectId}`}>{objectName.indexOf('/') > 0 ? objectName.split('/')[0] : objectName}
        </Link>
        </div>
    );
};

export default Breadcrumbs;
