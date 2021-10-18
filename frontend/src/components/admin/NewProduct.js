import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layouts/MetaData";
import Sidebar from './Sidebar';

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory ] = useState('');
    const [ stock, setStock ] = useState(0);
    const [ seller, setSeller] = useState('');
    const [ images, setImages ] = useState([]);
    const [ imagesPreview, setImagesPreview ] = useState([]);
    
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/admin/products');
            alert.success('Product created successfully!!!')
            dispatch({ type: NEW_PRODUCT_RESET})
        }

    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(createProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>

          <MetaData title={'New Product'} />
          <div className="row">
              <div className="col-12 col-md-2">
                    <Sidebar />
              </div>

              <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="new-prod-wrap my-5 rounded">
                            <form className="shadow-lg p-4" encType='multipart/form-data' onSubmit={submitHandler}>
                                <h1 className="mb-4">
                                    New Product
                                </h1>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category" className="pr-2">Category:</label>
                                    <select className="fomr-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller">Seller Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Images</label>

                                    <div className="custom-file">
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagesPreview.map(img => (
                                        <img 
                                            src={img} 
                                            key={img} 
                                            alt="Images preview" 
                                            className="mt-3 mr-2" 
                                            width="55" 
                                            height="52" 
                                        />
                                    ))}
                                </div>

                                <button
                                    type='submit'
                                    className='btn btn-block py-3'
                                    disabled={loading ? true : false}
                                >
                                    Create
                                </button>

                            </form>
                        </div>
                    </Fragment>
              </div>
          </div>

        </Fragment>
    )
}

export default NewProduct
