const router =require('express').Router();

const {getSlot,getSlotById,addSlot,updateSlot,deleteSlot}=require('./slotService')


router.get('/',getSlot)
// ----------------------------------------------------------------//
router.get('/:id',getSlotById)
// ----------------------------------------------------------------//
router.post('/',addSlot)
// ----------------------------------------------------------------//
router.patch('/:id',updateSlot)
// ----------------------------------------------------------------//
router.delete('/:id',deleteSlot)
// ----------------------------------------------------------------//

module.exports =router;