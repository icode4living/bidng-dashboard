import graphqlHelper from "@/utils/graphqlClient";
import { gql } from "@apollo/client/core";

const GET_CATEGORY_TABLE = gql`
query GetCategory {
    getCategory {
        id
        name
    }
    }`;
   export interface Category{
    
        id:string;
        name:string;
    }
    export interface CategoryProps{
       
            getCategory:Category[]
    }
export async function getCategoryItem():Promise<CategoryProps> {
    const data:CategoryProps = await graphqlHelper.executeQuery(GET_CATEGORY_TABLE)
console.log("category",data)
    return data;
    
}