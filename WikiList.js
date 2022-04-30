import React from "react";

const WikiList = (props) =>{
    return props.wikilist.map((i)=>{
        return (
        <div key={i.pageid}>
            {i.title}
            <br/>
            <span dangerouslySetInnerHTML={{__html:i.snippet}}/>
            <br/>
            <a href={`https://en.wikipedia.org?curid=${i.pageid}`}>
            View
            </a>
            <br/>
            =====================
        </div>
        )
    })
}

export default WikiList;