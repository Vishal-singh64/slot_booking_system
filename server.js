const express =require('express');
require('dotenv').config();

const getSlot =require('./API/slot/slotController.js')

const app =express();
app.use(express.json());

// -----------// Routes start here //----------//
app.use('/api/slot',getSlot);

// -----------// Routes ends here //----------//


app.listen(process.env.PORT,()=>{
    console.log('listning at port :',process.env.PORT);
})