import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminShop.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminShop() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [tag, setTag] = useState('Guitar');
    const [condition, setCondition] = useState('New');
    const [stock, setStock] = useState(1);
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate('/admin');
    }
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const apiUrl = "http://localhost:5000";

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('Price', price);
      formData.append('tag', tag);
      formData.append('condition', condition);
      formData.append('stock', stock);
      formData.append('image', image);
      try{
        const res = await axios.post(`${apiUrl}/api/upload`, formData, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        })
        setImageUrl(res.data.imageUrl);
        console.log('Image uploaded successfully!');
        toast.success(`${name} is added to the shop`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }catch(err){
        console.error('Error uploading the image:', err);
        toast.error("Error uploading this item!",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  
    return (
      <div className='adminShop-container'>
        <div>
          <form onSubmit={handleSubmit} className='adminShop-form-container'>
            <div className='adminShop-name'>
              <label>Name:</label>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className='adminShop-form-input'/>
            </div>
            <div className='adminShop-price'>
              <label>Price:</label>
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className='adminShop-form-input'/>
            </div>
            <div className='adminShop-tag'>
              <label>Tag:</label>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className='adminShop-form-input'>
                  <option value="Guitar">Guitar</option>
                  <option value="Piano">Piano</option>
                  <option value="Drums">Drums</option>
                  <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className='adminShop-condition'>
              <label>Condition:</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} className='adminShop-form-input'>
                  <option value="New">New</option>
                  <option value="Old">Used</option>
              </select>
            </div>
            <div className='adminShop-stock'>
              <label>Stock:</label>
              <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required className='adminShop-form-input' />
            </div>
            <div className='adminShop-photo'>
              <label>Image:</label>
              <input type="file" onChange={handleImageChange} required className='adminShop-form-input' />
            </div>
            <div className='adminShop-btn'>
              <button type="submit" className='adminShop-form-btn'>Upload</button>
            </div>
          </form>
          {imageUrl && <img src={imageUrl} alt='Uploaded' />}
        </div>
        <button onClick={handleGoBack} className='goBack-btn'>Go Back</button>
      </div>
    )
}

export default AdminShop
