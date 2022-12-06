import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactCrop from 'react-image-crop'

const Home = (params) => {

  const { setOutput, setCrop, crop } = params;
  const [image, setImage] = useState()
  const [imgSrc, setImgSrc] = useState('')
  const navigate = useNavigate();

  const onLoad = (e) => {
    setImage(e.currentTarget)
  }

  const fileSelected = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const cropImageNow = (e) => {
    e.preventDefault();
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
    navigate("/filter");
    document.getElementsByClassName('container')[0].reset();
  };

  return (
    <form className='container'>
      <h1>Select Image</h1>
      <div className='container-div'>
        <div className="input-group m-3">
          <input type="file" accept='image/*' onChange={fileSelected} className="form-control" />
        </div>
      </div>
      {imgSrc && <h1>Crop Image First</h1>}
      <div style={{flexDirection:"column"}} className='input-group'>

        <ReactCrop crop={crop} onChange={percentCrop => setCrop(percentCrop)}>
          <img style={{ width: "800px" }} src={imgSrc} alt="" onLoad={onLoad} />
        </ReactCrop>
        
      {crop && <button className='crop-btn' onClick={cropImageNow}>Crop</button>}
      </div>

    </form>
  )
}

export default Home