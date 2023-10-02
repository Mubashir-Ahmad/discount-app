import { ProductcategoryModel } from "../model/categoryModel.js";



class productCategoryController{
    static createProductcategory = async (req,res)=>{
        try{
            const {title } = req.body
            const store_create = new ProductcategoryModel({
                title:title,
                user:req.user.id
            });
            const result = await store_create.save()
            res.status(200).json({success:true,message:"Category Create Successfully"})
        }
        catch(err){
            console.log("Create_product_category Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default productCategoryController