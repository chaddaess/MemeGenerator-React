import React from "react";


export default  function App(){

    const [meme,setMeme]=React.useState({
        img:"https://i.imgflip.com/1bij.jpg",
        topText:"",
        bottomText:"",
    })
    const [allMemes,setAllMemes]=React.useState([])
    //api call to get an array with all the meme data
    //set the state to the data obtained from the api

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemes(data.data.memes))

    },[])

    function handleChange(event){
        const {name,value,type}=event.target;
        setMeme(prevMeme=>(
            {
                ...prevMeme,
                [name]:value,
            }
        ))

    }

    function getRandomImage(){
        let randomNumber=Math.floor(Math.random()*allMemes.length)
        let url=allMemes[randomNumber].url
        setMeme(prevState =>(
            {
                ...prevState,
                img:url
            }
        ))

        //console.log(url)


    }


    return(
        <div className="container">

            <h1 className="header">
                Meme Generator
            </h1>
            <form className="form-control">
                <input
                    type="text"
                    placeholder="top text here"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}

                />

                <input
                    type="text"
                    placeholder="bottom text here"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

            </form>

            <button
                className="btn"
                onClick={getRandomImage}

            >
                Get a new image :D
            </button>

            <div className="meme">
            <img  className="meme--img" src={meme.img}/>
            <h1 className="meme--text Top">{meme.topText}</h1>
            <h1 className="meme--text Bottom">{meme.bottomText}</h1>
            </div>

        </div>
    )
}