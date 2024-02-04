// import open from './api/hello'
// import clickHandler from './api/openai'
import { useState, useEffect } from 'react'

export default function Home() {
    const [userInput, setUserInput] = useState("")
    const [response, setResponse] = useState(null)

    const handleClick = () => {
      const petName = {
        "pet": userInput
      }
      fetch('/api/hello', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(petName), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data:', data)
          setResponse(data)
        })
    }
  

    return (
      <div>
        <h1>Name my pet</h1>
        <input type="text" value={userInput} 
        onChange={e => setUserInput(e.target.value)}/>
        <button onClick={handleClick}>Search</button>
        {response &&
        <div>
          {response.completion.message.content}
          <img src={response.image[0].url} />
        </div>}
      </div>
    );
  }
