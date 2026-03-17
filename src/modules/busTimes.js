// import {rejseplanenAPI} from "../data/rejseplanenAPI"
import {create} from "../utils/create"
import {set} from "../utils/set"


export function rejseplanenModule(){

    const rejseplanenContainer = create("div","rejseplanen-container")
    
    const busTitle = create("h2")
    busTitle.textContent = "BUSTIDER"

    const listContainer = create("div", "list-container")

    const leftList = create("ul", "left-list")

    const rightList = create("ul", "right-list")
    

    set([leftList, rightList], listContainer)

    set([busTitle, listContainer], rejseplanenContainer)

    return rejseplanenContainer
}