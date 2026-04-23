export interface Food {
    "name": string,
    "description": string,
    "zutaten": string[],
    "link": string
}

export interface Ingredient {
    "name": string,
    "available": boolean
}