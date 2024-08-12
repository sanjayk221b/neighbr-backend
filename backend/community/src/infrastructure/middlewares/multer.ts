import multer from 'multer'

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })


export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination:string;
  filename:string;
  path:string;
  size: number;
  buffer:Buffer;
}