import { useState } from 'react'
import './QRCode.css'

export const QRCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQRData] = useState("");
  const [qrSize, setQRSize] = useState(150);

async function generateQR(){
     setLoading(true)
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
      setImg(url)
    }
    catch(error){
      console.error("Error Generating QR Code",error)
    }
    finally{
      setLoading(false)
    }
  }
  function downloadQR(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  return (
    <div>
        <div className="app-container">
           <h1 className="qr-heading">QR CODE GENERATOR</h1>
         <div>
          {loading && <p style={{color:'black'}}>Please Wait....</p>} 
          {img && <img src={img} className="qr-image"/>} 
           <label htmlFor="dataInput" className="input-label">Data for QR Code</label>
           <input type="text" id="dataInput" placeholder="Enter data for QR code" value={qrData} onChange={(e)=>setQRData(e.target.value)}/>
           <label htmlFor="sizeInput" className="input-label">Image size</label>
           <input type="text" id="sizeInput" placeholder="e.g., 150" value={qrSize} onChange={(e)=>{setQRSize(e.target.value)}}/>
           <button className="qr-generate-btn" onClick={generateQR} disabled={loading}>Generate QR Code</button>
           <button className="qr-download-btn"  onClick={downloadQR}>Download QR Code</button>
         </div>
        </div>
    </div>
  )
}
