import { navigate } from "gatsby";

export const prefix = '';

export const navigateTo = (link) => {
    navigate(`${prefix}/${link}`)
} 

