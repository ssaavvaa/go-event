import { navigate } from "gatsby";

export const prefix = '';

export const navigateTo = (link) => {
    navigate(`${link}`)
} 

export const StrapiAPI = process.env.API_URL || 'http://localhost:1337'

