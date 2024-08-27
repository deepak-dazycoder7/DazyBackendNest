import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Directory where files will be stored
    filename: (req, file, cb) => {
      const fileExtName = extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtName}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    const allowedVideoTypes = ['video/mp4'];
    
    if (
      (file.mimetype.startsWith('image/') && allowedImageTypes.includes(file.mimetype)) ||
      (file.mimetype.startsWith('video/') && allowedVideoTypes.includes(file.mimetype))
    ) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Invalid file type'), false);
    }
  },
};
