import express from 'express';
import signupValidation from '../../src/components/signUp/helpers/signupValidation';


let router = express.Router();
router.post('/', (req, res) => {

    const {errors, isValid} = signupValidation(req.body);

    if (isValid) {
        res.status(200).json({success:true});
    }else{
        res.status(400).json(errors);
    }
});

export default router;
