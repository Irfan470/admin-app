import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import React from 'react'

export default async function handler(req, res) {
  const { method } = req
  await mongooseConnect()
    if (method === 'POST') {
       const { name } = req.body
      const CatDoc = await Category.create({ name })    
         res.json(CatDoc)
    }
    if (method === 'GET') {
        const CatDoc = await Category.find({})
        res.json(CatDoc)
        }
}
