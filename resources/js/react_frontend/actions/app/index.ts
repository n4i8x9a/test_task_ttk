import i18next from "i18next";

i18next
    .init({defaultNS:"common"})
    .then();

export function updateTitleAction(title:string)
{
    return {type:"TITLE_UPDATE",payload:{title:title}}
}

export function updateHeaderTextAction(headerText:string)
{
    return {type:"HEADER_TEXT_UPDATE",payload:{headerText:headerText}}
}


export function windowResizeAction()
{
    return {type:'WINDOW_RESIZE',payload:{width:window.innerWidth,height:window.innerHeight}};
}

export function searchButtonShowAction(value:boolean)
{
    return {type:"SEARCH_BUTTON_SHOW",payload:{
        button:value
        }}
}

export function searchButtonValueAction(value:boolean)
{
    return {type:"SEARCH_BUTTON_VALUE",payload:{
            panel:value
        }}
}

export function changeLanguageAction(language:string)
{
    i18next.changeLanguage(language).then();
    return {type:"CHANGE_LANGUAGE"};
}