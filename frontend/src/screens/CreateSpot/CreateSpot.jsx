import { useDispatch, useSelector } from 'react-redux';
import { createSpotThunk } from '../../store/spots';
import './CreateSpot.css'
import { useEffect, useState } from 'react';

function CreateSpot() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  let spots = useSelector(state => state.spotState.allSpots)

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateAddress, setStateAddress] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrlA, setImageUrlA] = useState('');
  const [imageUrlB, setImageUrlB] = useState('');
  const [imageUrlC, setImageUrlC] = useState('');
  const [imageUrlD, setImageUrlD] = useState('');

  const handleFormSubmit = async () => {
    const form = {
      address,
      city,
      state: stateAddress,
      country,
      lat,
      lng,
      name,
      description,
      price
    }

    form.lat = Number(form.lat);
    form.lng = Number(form.lng);
    form.price = Number(form.price);

    const imageForm = {
      previewImage,
      imageUrlA,
      imageUrlB,
      imageUrlC,
      imageUrlD
    }
    console.log('form sent to thunk for create', form);
    const res = await dispatch(createSpotThunk(form));
    if (!res.ok) {
      const err = await res.json();
      const backendErrors = {};
      backendErrors.message = err.message;
      setErrors(backendErrors);
    }
  }

  return (
    <main className="create-spot-main">
      <header>
        <h1>Create a New Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
      </header>
      <div className="form-create-spot" action="">
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Country" />
        <label htmlFor="street">Street Address</label>
        <input type="text" name="street" id="street" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" />
        <div className="form-city-state">
          <div className="form-city">
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" />
          </div>,
          <div className="form-state">
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" onChange={(e) => setStateAddress(e.target.value)} value={stateAddress} placeholder="STATE" />
          </div>
        </div>
        <div className="form-lat-lgn">
          <div className="form-lat">
            <label htmlFor="lat">Latitude</label>
            <input type="text" name="lat" id="lat" onChange={(e) => setLat(e.target.value)} value={lat} placeholder="Latitude" />
          </div>
          <div className="form-lng">
            <label htmlFor="lng">Longitude</label>
            <input type="text" name="lng" id="lng" onChange={(e) => setLng(e.target.value)} value={lng} placeholder="Longitude" />
          </div>
        </div>
        <div className="form-description">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, only special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Please write at least 30 characters"></textarea>
        </div>
        <div className="form-title">
          <h2>Create a title for your spot</h2>
          <p>Catch a guest&apos;s attention with a spot title that highlights what makes your place special.</p>
          <input type="text" name="title" id="title" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name of your spot" />
        </div>
        <div className="form-price">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher
          in search results</p>
          <div className="form-price-input">
            $
            <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price per night (USD)" />
          </div>
        </div>
        <div className="form-photos">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input type="text" name="previewImage" id="previewImage" placeholder="Preview Image URL" />
          <input type="text" name="imageA" id="imageA" placeholder="Image URL" />
          <input type="text" name="imageB" id="imageB" placeholder="Image URL" />
          <input type="text" name="imageC" id="imageC" placeholder="Image URL" />
          <input type="text" name="imageD" id="imageD" placeholder="Image URL" />
        </div>
        <button type="submit" onClick={() => handleFormSubmit()}>Submit</button>
      </div>
    </main>
  )
}

export default CreateSpot;
