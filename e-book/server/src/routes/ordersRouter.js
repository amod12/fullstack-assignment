const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');

router.post("/orders",  async (req, res) => {
    try {
        const dbResponse = await Orders.create(req.body)
        if(dbResponse){
            res.status(200).json({
                msg: "orders dispatched successfully"
            })
        }
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/orders", async (req, res) => {
    try {
        const totalOrdersLength = await Orders.find()
        if(req.query.userId){
          const data = await Orders.find({"userId":req.query.userId})
          res.status(200).json({
            orders: data
        })
        }else{
         const data = await Orders.find().limit(req.query.size).skip(req.query.size* req.query.page - req.query.size)
          if(data){
              res.status(200).json({
                  orders:data,
                  totalOrdersCount: totalOrdersLength.length
              })
          }
        }
       
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/orders", async (req, res) => {
    try {
      const data = await Orders.findByIdAndDelete(req.body._id)
      if(data){
        res.status(200).json({msg: 'deleted successfully'})
      }
      else{
        res.status(500).json({msg:"something went wrong"})
      }
    } catch (err) {
        console.log(err);
    }
    });


    router.put("/orders", async (req, res) => {
      try {
        const data = await Orders.findByIdAndUpdate(req.body._id, req.body)
        if(data){
          res.status(200).json({msg: "updated successfully!"})
        }
        else{
          res.status(500).json({msg:"something went wrong"})
        }
      } catch (err) {
        console.log(err);
      }
    });
      

module.exports = router;
