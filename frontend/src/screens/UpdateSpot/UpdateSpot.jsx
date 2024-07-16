import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotDetailsThunk, updateSpotThunk } from '../../store/spots';
import { useEffect, useState } from 'react';
import './UpdateSpot.css';

function UpdateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const spots = useSelector(state => state.spotState.allSpots);
  const spotDetails = useSelector(state => state.spotState.spotDetails);
  const { spotId } = useParams();
  // const [prevImgErr, setPrevImgErr] = useState('');
  // const [imgAErr, setImgAErr] = useState('');
  // const [imgBErr, setImgBErr] = useState('');
  // const [imgCErr, setImgCErr] = useState('');
  // const [imgDErr, setImgDErr] = useState('');

  // console.log('spotDetails images', spotDetails.SpotImages);
  // const [ previewImage, imageA, imageB, imageC, imageD ] = spotDetails.SpotImages;
  // console.log('destructured images', previewImage, imageA, imageB, imageC, imageD);
  console.log(spotDetails.address)

  const [spotForm, setSpotForm] = useState({
    address: spotDetails.address,
    city: spotDetails.city,
    state: spotDetails.state,
    country: spotDetails.country,
    lat: spotDetails.lat,
    lng: spotDetails.lng,
    name: spotDetails.name,
    description: spotDetails.description,
    price: spotDetails.price,
    // previewImage: '',
    // imageA: '',
    // imageB: '',
    // imageC: '',
    // imageD: '',
  })

  useEffect(() => {
    const getData = async() => {
      await dispatch(getSpotDetailsThunk(Number(spotId)));
      setIsLoaded(true);
      // setSpotForm({...spotDetails});
    }
    if (!isLoaded) {
      getData()
    }
  },[dispatch, isLoaded, spotDetails, spotId])

  if(!isLoaded) {
    return <h1>Loading...</h1>
  }

  // console.log('spotform.previewImage check', previewImage);

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({});

    try {
      // if (!previewImage || previewImage === '') {
      //   setPrevImgErr('Preview image is required');
      //   delete spotForm.previewImage;
      // } else if (endsWithImage(spotForm.previewImage) === false) {
      //   setPrevImgErr('Image URL must end in .png, .jpg, or .jpeg');
      //   delete spotForm.previewImage;
      // }

      // if (spotForm.imageA && !endsWithImage(spotForm.imageA)) {
      //   setImgAErr('Image URL must end in .png, .jpg, or .jpeg');
      //   delete spotForm.imageA;
      // } else if (!spotForm.imageA) {
      //   delete spotForm.imageA;
      // }

      // if (spotForm.imageB && !endsWithImage(spotForm.imageB)) {
      //   setImgBErr('Image URL must end in .png, .jpg, or .jpeg');
      //   delete spotForm.imageB;
      // } else if (!spotForm.imageB) {
      //   delete spotForm.imageB;
      // }

      // if (spotForm.imageC && !endsWithImage(spotForm.imageC)) {
      //   setImgCErr('Image URL must end in .png, .jpg, or .jpeg');
      //   delete spotForm.imageC;
      // } else if (!spotForm.imageC) {
      //   delete spotForm.imageC;
      // }

      // if (spotForm.imageD && !endsWithImage(spotForm.imageD)) {
      //   setImgDErr('Image URL must end in .png, .jpg, or .jpeg');
      //   delete spotForm.imageD;
      // } else if (!spotForm.imageD) {
      //   delete spotForm.imageD;
      // }

      spotForm.lat = Number(spotForm.lat);
      spotForm.lng = Number(spotForm.lng);
      spotForm.price = Number(spotForm.price);

      const res = await dispatch(updateSpotThunk(spotForm, spotId));
      console.log('spotform on sumbit', spotForm);
      console.log('res on sumbit', res);

      if (!res.id) {
        const err = await res.json();
        console.log('err from res on sumbit', err);
        const backendErrors = {};
        backendErrors.message = err.message;
        setErrors(err.errors);
      } else {
        console.log('res', res);
        navigate(`/spots/${res.id}`)
      }
    } catch (error) {
      return error;
    }
  }

  function updateSpotForm(e, label) {
    setSpotForm(prev => {
      const newSpotForm = {...prev};
      newSpotForm[label] = e.target.value;
      console.log('new spot form in updater', newSpotForm);
      return newSpotForm;
    })
  }

  function endsWithImage(value) {
    if (
      !value.endsWith('.png') &&
      !value.endsWith('.jpg') &&
      !value.endsWith('.jpeg')
    ) {
      return false
    } else {
      return true
    }
  }

  // function validateImage(label) {
  //   if (label === 'previewImage' && !spotForm.previewImage.length) {
  //     return 'Preview image is required';
  //   }
  //   if (!spotForm[label].endsWith('.png') && !spotForm[label].endsWith('.jpg') && !spotForm[label].endsWith('.jpeg')) {
  //     return 'Image URL must end in .png, .jpg, or .jpeg';
  //   }
  //   return;
  // }

  return (
    <main className="update-spot-main">
      <header className='update-spot-header'>
        <h1>Update a New Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p className='sub-header'>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
      </header>
      <form className="form-update-spot" onSubmit={onSubmit}>
        <div className="label-error">
          <label htmlFor="country">Country</label>
          <p>{errors.country}</p>
        </div>
        <input type="text" name="country" id="country" onChange={(e) => updateSpotForm(e, 'country')} value={spotForm.country} placeholder="Country" />
        <div className="label-error">
          <label htmlFor="street">Street Address</label>
          <p>{errors.address}</p>
        </div>
        <input type="text" name="street" id="street" onChange={(e) => updateSpotForm(e, 'address')} value={spotForm.address} placeholder="Address" />
        <div className="form-city-state">
          <div className="form-city">
            <div className="label-error">
              <label htmlFor="city">City</label>
              <p>{errors.city}</p>
            </div>
            <input type="text" name="city" id="city" onChange={(e) => updateSpotForm(e, 'city')} value={spotForm.city} placeholder="City" />
          </div>
            <span className='form-comma'>,</span>
          <div className="form-state">
            <div className="label-error">
              <label htmlFor="state">State</label>
              <p>{errors.state}</p>
            </div>
            <input type="text" name="state" id="state" onChange={(e) => updateSpotForm(e, 'state')} value={spotForm.state} placeholder="STATE" />
          </div>
        </div>
        <div className="form-lat-lng">
          <div className="form-lat">
            <div className="label-error">
              <label htmlFor="lat">Latitude</label>
              <p>{errors.lat}</p>
            </div>
            <input type="text" name="lat" id="lat" onChange={(e) => updateSpotForm(e, 'lat')} value={spotForm.lat} placeholder="Latitude" />
          </div>
            <span className="form-comma">,</span>
          <div className="form-lng">
            <div className="label-error">
              <label htmlFor="lng">Longitude</label>
              <p>{errors.lng}</p>
            </div>
            <input type="text" name="lng" id="lng" onChange={(e) => updateSpotForm(e, 'lng')} value={spotForm.lng} placeholder="Longitude" />
          </div>
        </div>
        <div className="form-description">
          <div className="label-error">
            <h2>Describe your place to guests</h2>
            <p>{errors.description}</p>
          </div>
          <p className='sub-header'>Mention the best features of your space, only special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea name="description" id="description" onChange={(e) => updateSpotForm(e, 'description')} value={spotForm.description} placeholder="Description"></textarea>
        </div>
        <div className="form-title">
          <div className="label-error">
            <h2>Update a title for your spot</h2>
            <p>{errors.name}</p>
          </div>
          <p className='sub-header'>Catch a guest&apos;s attention with a spot title that highlights what makes your place special.</p>
          <input type="text" name="name" id="name" onChange={(e) => updateSpotForm(e, 'name')} value={spotForm.name} placeholder="Name of your spot" />
        </div>
        <div className="form-price">
          <div className="label-error">
            <h2>Set a base price for your spot</h2>
            <p>{errors.price}</p>
          </div>
          <p className='sub-header'>Competitive pricing can help your listing stand out and rank higher
          in search results</p>
          <div className="form-price-input">
            $
            <input type="text" name="price" id="price" onChange={(e) => updateSpotForm(e, 'price')} value={spotForm.price} placeholder="Price per night (USD)" />
          </div>
        </div>
        {/* <div className="form-photos">
          <h2>Liven up your spot with photos</h2>
          <p className='sub-header'>Submit a link to at least one photo to publish your spot</p>
          <div className="image-url-errors">
            <input type="text" name="previewImage" id="previewImage" onChange={(e) => updateSpotForm(e, 'previewImage')} value={previewImage.url} placeholder="Preview Image URL"/>
            <p>{!prevImgErr && errors.url ? errors.url : prevImgErr}</p>
          </div>
          <div className="image-url-errors">
            <input type="text" name="imageA" id="imageA" onChange={(e) => updateSpotForm(e, 'imageA')} value={imageA.url} placeholder="Image URL" />
            <p>{imgAErr}</p>
          </div>
          <div className="image-url-errors">
            <input type="text" name="imageB" id="imageB" onChange={(e) => updateSpotForm(e, 'imageB')} value={imageB.url} placeholder="Image URL" />
            <p>{imgBErr}</p>
          </div>
          <div className="image-url-errors">
            <input type="text" name="imageC" id="imageC" onChange={(e) => updateSpotForm(e, 'imageC')} value={imageC.url} placeholder="Image URL" />
            <p>{imgCErr}</p>
          </div>
          <div className="image-url-errors">
            <input type="text" name="imageD" id="imageD" onChange={(e) => updateSpotForm(e, 'imageD')} value={imageD.url} placeholder="Image URL" />
            <p>{imgDErr}</p>
          </div>

        </div> */}
        <div className="form-button">
          <button type="submit">Update Spot</button>
        </div>
      </form>
    </main>
  )
}

export default UpdateSpot;
