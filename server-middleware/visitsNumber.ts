let visitsNumber = 0

export default function (req:any, res:any) {
  console.log('server-middleware', req.url, Date.now())
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ visitsNumber: ++visitsNumber }))
  res.end()
}
