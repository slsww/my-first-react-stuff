import React from "react";
const clickImages = (index) =>{
    console.log(index);
}
const ImageList = (props) =>{
    return props.list.map((i)=>{
        return <div key={i.id}><img src={i.urls.regular} onClick={clickImages}/>
        {i.urls.regular}
        </div>
    
})
}

export default ImageList;