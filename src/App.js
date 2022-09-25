import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [userData, setUserData] = useState("");
  const [searchUser, setSearchUser] = useState('')
  const [callApi, setCallApi] = useState(true)
  useEffect(() => {
    axios.get(`https://api.github.com/users/${inputValue ? inputValue : "annas-ahmed"}`)
      .then((res) => {
        setUserData(res.data);
        setCallApi(true)
      })
      .catch((error) => {
        console.log(error);
        setCallApi(false)
      })
  }, [searchUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchUser(!searchUser)
    console.log(inputValue)
  }
  return (
    <>
      <section className='main-section'>
        <h1>
          github search bar
        </h1>
        <section>
          <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='search username'>
            </input>
          </form>
          {
            callApi ?
              <section>
                <div>
                  <img src={userData.avatar_url} alt='user' />
                </div>
                <li>Name : {userData.name}</li>
                <li>bio : {userData.bio}</li>
                <li>followers : {userData.followers}</li>
                <li>following : {userData.following}</li>
                <li>repositries : {userData.public_repos}</li>
              </section>
              :
              <img className='notfound-image' src={require('./Assets/error.png')} alt='not found' />
          }
        </section>
      </section>
    </>

  )
}

export default App;
