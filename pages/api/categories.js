import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import { getServerSession } from 'next-auth'
import { configAd, isAdmin } from './auth/[...nextauth]'


export default async function handler(req, res) {
   await isAdmin(req, res)
  const { method } = req
  await mongooseConnect()
    if (method === 'POST') {
       const { name } = req.body
      const CatDoc = await Category.create({ name })    
         res.json(CatDoc)
    }
    if (method === 'PUT') {
        const { name, _id } = req.body
        const CatDoc = await Category.findByIdAndUpdate({_id}, { name }, { new: true })
        res.json(CatDoc)}
    if (method === 'GET') {
        const CatDoc = await Category.find({})
        res.json(CatDoc)
        }
    if (method === 'DELETE') {
        const { _id } = req.body
        const CatDoc = await Category.findByIdAndDelete({_id})
        res.json(CatDoc)
    }
}
