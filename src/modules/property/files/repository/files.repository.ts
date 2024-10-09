import { Repository } from "typeorm";
import { FilesEntity } from "../entity/file.entity";

export class FilesRepository extends Repository<FilesEntity> { }