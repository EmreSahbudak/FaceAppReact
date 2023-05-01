import React, { useState } from 'react';
import Post from '../../components/Post';


function Header() {
  return (
    <div className="header">
      <div className="logo"><div>
            <h3>FACEAPP</h3>
        </div></div>
      <div className="login-signup">LOGIN / SIGNUP</div>
    </div>
  );
}

function Info() {
    const [profile,setProfile]=useState({});
    React.useEffect(()=>{
        fetch('http://localhost:9093/api/v1/userprofile/getmyprofile',
    {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            token : localStorage.getItem('token'),
        })
    }).then((data)=> data.json())
    .then((data)=>{
        setProfile(data);
    })
    },[])
  return (
    <div className="info">
        <img src={profile.avatar} alt="avatar" />
        <div className='infoyazi'>
        <h3>{profile.name +" "+ profile.surname}</h3>
        <h4>{"Kullanıcı Adı:"+profile.username}</h4>
        <h4>{profile.address}</h4>
        <h4>{profile.phone}</h4>
        </div>
    </div>
  );
}

function Posts() {
    const [postList,setPostList]=useState([]);
    React.useEffect(()=>{
        fetch('http://localhost:9092/post/getposts',
    {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            token : localStorage.getItem('token'),
        })
    }).then((data)=> data.json())
    .then((data)=>{
        setPostList(data);
    })
    },[])
  return (
    <div className="posts">
        {postList.map((post,index)=>(
             <Post item={post} key={index}/>
             
        ))}
        </div>
  );
}

function Settings() {
  return (
    <div className="settings">
        <div>
            <ul>
                <a href=""><li>Kullanıcı Bilgileri</li></a>
                <a href=""><li>Kaydedilen Postlar </li></a>
                <a href=""><li>Hareketlerim</li></a>
                <a href=""><li>Ayarlar</li></a>
                
                
                
            </ul>
        </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
        <div>
            Copyright
            <br /> 
            <br />
            Denizli/Türkiye
            <br />
            <br />
            Tüm hakları saklıdır.
        </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <div className="left-panel">
          <Info />
        </div>
        <div className="middle-panel">
          <Posts />
        </div>
        <div className="right-panel">
          <Settings />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
