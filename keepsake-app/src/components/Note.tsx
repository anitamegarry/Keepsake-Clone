import { useEffect, useState } from "react";
import "./Note.css"

interface NoteProp {
    id: string;
    title: string;
    isChecklist: boolean;
    content: string | string[];
    labels: number[]
}

interface LabelObj {
    id: string;
    userID: string;
    labelName: string;
}


export default function Note({ id, title, isChecklist, content }: NoteProp){

    const [labelList, setLabelList] = useState([])

    // const words = title.split(" ")
    // const capitalTitle = words.reduce((total, word) => {return total + word[0].toUpperCase() + word.slice(1).toLowerCase()}, "")

    async function getLabels(){
        const allLabels = await (await fetch("http://localhost:3000/labels")).json()
        const userLabels = allLabels.filter((label: LabelObj) => label.userID == id)
        setLabelList(userLabels)
    }

    useEffect(() => {
        getLabels()
    }, [])

    return <section className="note">
    <div className="note-head">
        <h3>{title}</h3>
        {labelList.map((label) => <p>{label}</p> )}
    </div>
    <div className="content">
        {
            isChecklist && (typeof content) == "object"? 
            <div>{content.map((point) => {
                return <label className="check-container">
                    <input type="checkbox" />
                    {point}
                </label> 
            })}</div>
            :
            <p>{content}</p>
        }
    </div>
    <div className="note-foot">
        <div className="buttons">
            <button>Delete</button>
            <button>Edit</button>
        </div>
        <p>semantic label</p>
    </div>
    </section>
}