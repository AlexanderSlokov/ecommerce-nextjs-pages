
import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import React from 'react'; // Add this line to import React
export default function NewTour(){
   return(
       <Layout>
           <h1>New Tour</h1>
           <ProductForm/>
       </Layout>
   )
}