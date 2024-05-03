import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     
      cb(null, './Public/Temp')
    },
    filename: function (req, file, cb) {
     
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExtension = file.originalname.match(/\.(png|jpg)$/)[0];
      

      cb(null, uniqueSuffix + fileExtension )
     
    

    }
  })
  
 export const upload = multer({ storage:storage })
 