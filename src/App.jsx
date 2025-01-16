import { useState } from 'react'
import './App.css'

function App() {
  const [url, setURL] = useState("")
  const [data, setData] = useState([])

  const gettingRSS = async (url) => {
    try {
      const response = await fetch("http://localhost:3001/rss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url }) // Enviar la URL como un JSON
      });

      if (!response.ok) throw new Error("Error al obtener el RSS");

      const feed = await response.json();
      setData(feed.items)

    } catch (error) {
      console.error("Error al obtener el RSS", error);
    }
  };

  const clearResults = () => {
    setData([])
    setURL("")
  }

  return (
    <>
      <div className='card box-form'>
        <div className="row" style={{ alignContent: 'center' }}>
          <div className="col" style={{ alignContent: 'center' }}>
            <input className="form-control inp-url" type="text" onChange={(e) => { setURL(e.target.value) }} placeholder="URL" value={url}/>
          </div>
          <div className='col' style={{ alignContent: 'center' }}>
            <div className="row container">
            <button className="btn btn-primary" onClick={() => gettingRSS(url)}>
              Add
            </button>

            </div>
            <div className="row container">
            <button className="btn btn-danger" onClick={() => clearResults()}>
              Clear
            </button>
            </div>
          </div>
          <div className='container'>
            {data.map((item) => (
              <div key={item.guid} className='card item'>
                <div className='title'>{(item.title).toUpperCase()}</div>
                <a className='link' href={item.link}>{item.link}</a>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
