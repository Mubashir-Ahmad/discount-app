import {categoryModel} from "../model/categoryModel.js";


class categoryController{
    // Create category
    static createcategory = async (req,res)=>{
        try{
            const {title } = req.body
            const store_create = new categoryModel({
                title:title,
                user:req.user.id
            });
            const result = await store_create.save()
            res.status(200).json({success:true,message:"Category Create Successfully"})
        }
        catch(err){
            console.log("Create_Store Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    static allcategories = async (req,res,next)=>{
        try{
                const category = await categoryModel.find();
                res.status(200).json({success:true,category})
        }
        catch(err){
            console.log("All_Store Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    static updatecategories = async (req,res,next)=>{
        try{
            const { id } = req.params;
            const newcategory_data = {
                title:req.body.category,
                user:req.user.id
            }
            const category = await categoryModel.findByIdAndUpdate(id,newcategory_data,{
                new:true,
                runValidator:true,
            });
            res.status(200).json({
                success:true,
                message:"Update successfully",
                category
            })
        }
        catch(err){
            console.log("Update_Store Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    static deletecategories = async (req,res,next)=>{
        try{
            const { id } = req.params;
                const category = await categoryModel.findById(id);
                if (!category){
                   return next(new ErrorHandler(`Category does not exist:${req.params}`,400))
                } 
                await category.deleteOne();
                res.status(200).json({
                    success:true,
                    message:"delete category successfully",
                    category
                })
            }
        catch(err){
            console.log("Delete_Store Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default categoryController