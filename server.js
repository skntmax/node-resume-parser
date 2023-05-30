const express = require('express')
const { parseCV } = require('./parser')
const app = express()
var cors = require('cors')

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, 'my-uploads')
    },
    
    filename: function ( req, file, cb ) {
       const ext = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"."+ext
      cb( null , file.fieldname + '-' + uniqueSuffix )
    }
  })

  const upload = multer({ storage: storage })


app.use(express.json())

app.use(cors())   
app.post('/root' , upload.single('cv') ,   async (req,res)=>{
    
     try{
     
        if(req.file) {
            const {filename} = req.file
            let cv_data  = await parseCV(filename)
            res.send(cv_data)
         }

     }catch(err){
        res.send(err)
     }
   
  //   console.log("cv_data" , cv_data)
   
})


app.listen(2000 , ()=>{
     
    console.log(" parsing server started on port 2000")

})