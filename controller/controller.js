const path = require("path");
const data = require("../model/model");

exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
};

exports.postData = async (req, res, next) => {
    const productName = req.body.data.productName;
    const description = req.body.data.description;
    const price = req.body.data.price;
    const quantity = parseInt(req.body.data.quantity);
    try {
        const result = await data.findOne({ where: { name: productName } });
        if (result) {
            const existingQuantity = parseInt(result.quantity);
            await data.update({
                quantity: existingQuantity + quantity
            }, {
                where: {
                    name: productName
                }
            })
        }
        else {
            await data.create({
                name: productName,
                description: description,
                price: price,
                quantity: quantity
            })
        }
        res.status(202).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error', error: error });
    }
}

exports.getData = async (req, res, next) => {
    try {
        const result = await data.findAll()
        res.json(result);
    } catch (error) {
        console.log(error)
    }
}

exports.updateData = async (req, res, next) => {
    const id = req.body.values.id;
    const value = req.body.values.value;
    try {
        const result = await data.findOne({ where: { id: id } })
        await data.update(
            {
                quantity: result.quantity - value
            },
            {
                where: { id: id }
            }
        );
        res.status(202).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error', error: error });
    }
}