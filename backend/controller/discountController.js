import discountmodel from "../model/discountModel.js";


class discountController{
    // Create discount
    static creatediscount = async (req,res)=>{
        try{
            const {title ,price} = req.body
            const discount_create = new discountmodel({
                title:title,
                price:price,
                user:req.user.id,
                expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            const result = await discount_create.save()
            res.status(200).json({success:true,message:"discount Create Successfully"})
        }
        catch(err){
            console.log("Create_discount Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    // All discount
    static alldiscount = async (req,res,next)=>{
        try{
                const discount = await discountmodel.find();
                res.status(200).json({success:true,discount})
        }
        catch(err){
            console.log("All_discount Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    static updatediscount = async (req,res,next)=>{
        try{
            const { id } = req.params;
            const newdiscount_data = {
                title:req.body.title,
                price:req.body.price,
                user:req.user.id
            }
            const discount = await discountmodel.findByIdAndUpdate(id,newdiscount_data,{
                new:true,
                runValidator:true,
            });
            res.status(200).json({
                success:true,
                message:"Update successfully",
                discount
            })
        }
        catch(err){
            console.log("Update_discount Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    static deletediscount = async (req,res,next)=>{
        try{
            const { id } = req.params;
                const discount = await discountmodel.findById(id);
                if (!discount){
                   return next(new ErrorHandler(`discount does not exist:${req.params}`,400))
                } 
                await discount.deleteOne();
                res.status(200).json({
                    success:true,
                    message:"delete discount successfully",
                    discount
                })
            }
        catch(err){
            console.log("Delete_discount Error:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default discountController