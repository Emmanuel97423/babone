import { PrismaClient } from '@prisma/client'
import type {ProductVariant } from '@/types/interfaces/Product'
const prisma = new PrismaClient()

// export type VariantFindUniqueArgs = {
//   where: VariantWhereUniqueInput
//   select?: VariantSelect | null
//   include?: VariantInclude | null
// }

export const fetchAllVariants:()=>Promise<ProductVariant[]> = async ()=>{
  try {
    const allVariants = await prisma.variant.findMany()
    if(allVariants){console.log(allVariants)
        return allVariants
    }
    await prisma.$disconnect()
  
  } catch (error) {
    console.error('error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const fetchVariantByName=async (name:string)=>{
  console.log('name:', name)
  try {
    const variant = await prisma.variant.findUnique({
      where:{
        name:String(name)
      }
    })
    if(variant){console.log(variant)
        return variant
    }
    await prisma.$disconnect()
  
  } catch (error) {
    console.error('error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const fetchProduct=async (variantItem:ProductVariant)=>{
  try {
    const variant = await prisma.variant.create(variantItem)
    if(variant){console.log(variant)
        return variant
    }
    await prisma.$disconnect()
  
  } catch (error) {
    console.error('error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const createVariant=async (variantItem:ProductVariant)=>{
  try {
    const variant = await prisma.variant.create(variantItem)
    if(variant){console.log(variant)
        return variant
    }
    await prisma.$disconnect()
  
  } catch (error) {
    console.error('error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}