import React, { useCallback, useContext, useEffect, useState } from 'react'
import './Shop.css';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';

function Shop() {

    const [shopData, setShopData] = useState([]);
    const apiUrl = "http://localhost:5000";
    useEffect(() => {
        const fetchShopData = async() => {
            try{
                const res = await axios.get(`${apiUrl}/api/shop-items`);
                setShopData(res.data);
            }catch(err){
                console.error('Error fetching shop data', err);
            }
        }

        fetchShopData();
    }, [])



    const [filteredShopData, setFilteredShopData] = useState(shopData);
    const [priceLow, setPriceLow] = useState(0);
    const [priceHigh, setPriceHigh] = useState(1000000);
    const [tag, setTag] = useState('');
    const [condition, setCondition] = useState('');
    const filterFunction = useCallback(() => {
        let filteredData = [];
        for (let i = 0; i < shopData.length; i++) {
            if(
                shopData[i].Price <= priceHigh && 
                shopData[i].Price >= priceLow && 
                (!tag || shopData[i].tag === tag) && 
                (!condition || shopData[i].condition === condition))
            {
                filteredData.push(shopData[i]);
            }
        }
        setFilteredShopData(filteredData);
    }, [priceLow, priceHigh, tag, condition, shopData])
    useEffect(()=>{
        filterFunction();
    }, [filterFunction]);

    const { addToCart } = useContext(CartContext);

  return (
    <div className='shop-container'>
        <div className='shop-component'>
            <div className='filter-component'>
                <label className='filter-label'>
                    Low Price:
                    <input
                        type="number"
                        value={priceLow}
                        onChange={(e) => setPriceLow(e.target.value)}
                        className='input-area'
                    />
                </label>
                <label className='filter-label'>
                    High Price:
                    <input
                        type="number"
                        value={priceHigh}
                        onChange={(e) => setPriceHigh(e.target.value)}
                        className='input-area'
                    />
                </label>
                <label className='filter-label'>
                    Intrument: <br />
                    <select value={tag} onChange={(e) => setTag(e.target.value)} className='input-area'>
                        <option value="" className='option-area'>All</option>
                        <option value="Guitar" className='option-area'> Guitar</option>
                        <option value="Piano" className='option-area'>Piano</option>
                        <option value="Drum" className='option-area'>Drum</option>
                        <option value="Accessory" className='option-area'>Accessories</option>
                    </select>
                </label>
                <label className='filter-label'>
                    Condition: <br />
                    <select value={condition} onChange={(e) => setCondition(e.target.value)} className='input-area'>
                        <option value="" className='option-area'>All</option>
                        <option value="New" className='option-area'>New</option>
                        <option value="Old" className='option-area'>Used</option>
                    </select>
                </label>
            </div>
            <div>
                <h1>Shop</h1>
                <div className='shop-grid'>
                    {
                        filteredShopData.map((item, key) => (
                            <div className='shop-grid-item' key={key}>
                                <img src={`${item.img}`} alt="bla"/>
                                <div className='info'>
                                    <h3 className='info-name'>{item.name}</h3>
                                    <h2 className='info-price'>₹{item.Price}/-</h2>
                                </div>
                                <button className='info-btn' onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shop
