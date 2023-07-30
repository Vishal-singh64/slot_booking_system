// const router =require('express').Router();
const conn =require('../../config/conn');


// ------------------------------------------------------------//
const getSlot=(req,res)=>{
    conn.query('select * from slots',(err,result)=>{
        if(err){
            console.log(err)
        }
        res.json({
            data:result,
        })
    })
}
// ------------------------------------------------------------//
const getSlotById=(req,res)=>{
    const id=req.params.id;
    conn.query(`select * from slots where id =${id}`,(err,result)=>{
        if(err){
            res.json({
                status:0,
                msg:"something went wrong"
            })
        }
        res.json({
            status:1,
            data:result,
        })
    })   
}
// ------------------------------------------------------------//
const addSlot = (req, res) => {
    var data = req.body;
  
    // Convert date and time strings to JavaScript Date objects
    const startTime = new Date(data.slot_Date + ' ' + data.slot_Start_Time);
    const endTime = new Date(data.slot_Date + ' ' + data.slot_End_Time);
  
    if (startTime >= endTime) {
      res.json({
        "msg": "Invalid time slot. Start time must be before end time."
      });
      return;
    }
  
    conn.query(
      `SELECT * FROM slots WHERE slot_Date=? AND NOT (slot_End_Time <= ? OR slot_Start_Time >= ?) AND slot_status=?`,
      [
        data.slot_Date,
        data.slot_Start_Time,
        data.slot_End_Time,
        1,
      ],
      (err, result) => {
        if (err) {
          console.error('Error checking overlapping slots:', err.message);
          res.status(500).json({
            "msg": "An error occurred while checking overlapping slots."
          });
        } else {
          if (result.length > 0) {
            res.json({
              "msg": "Slot alredy booked. Please choose another slot."
            });
          } else {
            conn.query(
              `INSERT INTO slots (slot_Date, slot_Start_Time, slot_End_Time, slot_status) VALUES (?, ?, ?, ?)`,
              [
                data.slot_Date,
                data.slot_Start_Time,
                data.slot_End_Time,
                1,
              ],
              (err, result) => {
                if (err) {
                  console.error('Error posting new slot:', err.message);
                  res.status(500).json({
                    "msg": "An error occurred while posting the new slot."
                  });
                } else {
                  res.json({
                    "msg": "Slot successfully posted."
                  });
                }});
          }}}
    );
  };
  
    
// -----------------------------------------------------------//
const updateSlot=(req,res)=>{
    const id=parseInt(req.params.id);
    const data=req.body;
    conn.query(`update Slots set slot_Date= ? ,slot_Start_Time=?,slot_End_Time=? where id=?`,
    [
        data.slot_Date,
        data.slot_Start_Time,
        data.slot_End_Time,
        id,
    ],
    (err,result)=>{
        if(err){
            console.log(err)
        }
        res.json({
            status:1,
            data:'Slot updated successfully',
        })
    })
    
}
// -----------------------------------------------------------//
const deleteSlot=(req,res)=>{
    conn.query('delete slots where id = ?'),[ parseInt(req.params.id)],(err,result)=>{
        if(err){
            console.log(err)
        }
        res.json({
            status:1,
            msg:"Slot Deleted successfully"
        })
    }
}
// -----------------------------------------------------------//

module.exports={
    getSlot,getSlotById,addSlot,updateSlot,deleteSlot
}