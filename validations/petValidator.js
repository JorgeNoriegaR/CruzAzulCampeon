const { check, validationResult } = require('express-validator');

const generatePetValidators = () => [
    check('alias').notEmpty().isLength({ max: 50 }).withMessage("Invalid name"),
    check('type').notEmpty().isIn(["DOG","CAT"]).withMessage("Invalid type (DOG or Cat)"),
    check('color').notEmpty().isLength({ max: 50 }).withMessage("Invalid color"),
    check('notes').notEmpty().isLength({ max: 150 }).withMessage("Invalid notes")
]

const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id")
]

const updatePetValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('alias').isLength({max:50}).withMessage("Invalid name"),
    check('type').isIn(["DOG","CAT"]).withMessage("Invalid type(DOG or CAT"),
    check('color').isLength({max:50}).withMessage("Invalid color"),
    check('notes').isLength({max:50}).withMessage("Invalid address"),
]

const deletePetValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id")
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({
            "success": false,
            "code": 404,
            "message": errors,
            "data": []
        });
    }
    next();
}
module.exports = {
    add: [
        generatePetValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updatePetValidators(),
        reporter
    ],
    delete: [
        deletePetValidators(),
        reporter
    ]
}