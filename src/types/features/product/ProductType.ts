interface OptionProps {
    name:string,
    details:string,
    value:string
}

interface VariantProps  {
    id?:string,
    name:string,
    stock:number,
    options:OptionProps[]

}

interface ProductProps  {
id?:string,
name:string,
categoryId:string,
images?:string[],
description:string,
manufacturer?:string,
priceHT:number,
priceTTC:number,
tva:number,
variants?:VariantProps[]
}