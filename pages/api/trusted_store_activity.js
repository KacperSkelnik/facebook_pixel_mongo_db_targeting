import nextConnect from 'next-connect';
import middleware from '../../database/mongo';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
    await req.db.collection('trusted_store_activity').insertOne(data, function(err, res){
        if (err) throw err;
    });
    res.json({message: 'document inserted'});
})

handler.get(async (req, res) => {
    const { user_id } = req.query;
    let doc = {}

    const dataModel = {fn: null, ln: null, em: null, external_id: null}
    if(user_id){
        doc = await req.db.collection('trusted_store_activity').findOne({user_id: user_id, action: "CLICK"})
    } 
    if(doc == null){
        doc = dataModel
    }
    res.json(doc)
})

export default handler