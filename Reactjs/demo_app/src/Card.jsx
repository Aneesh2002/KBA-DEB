import { useState } from "react";

const Card = ({customClasses}) => {
    const[likes,setLikes]= useState(0)
    const[titlecolor,setTitleColor] = useState('text-black')

    const toggleTitleColor = () =>{
        setTitleColor((prevColor)=>
        prevColor === 'text-black'?'text-blue-500':'text-black'
    );
    };
    return (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white mt-12 ml-12 ${customClasses}`}>
            <h2 className={`font-bold text-xl mb-2 ${titlecolor}` }>
                Card Title
            </h2>
            <p className="text-red-500 text-base">this is some example text in the card</p>
            <button className="mt-4 px-2 bg-orange-500 text-white rounded hover:bg-orange-700" 
            onClick={()=>setLikes(likes+1)}>Likes:{likes}</button>
            <button className=" ml-14 mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-700"
            onClick={toggleTitleColor}>Toggle Title Color</button>

        </div>
    )
}
export default Card