import { forwardRef, Module } from "@nestjs/common";
import { FilesController } from "./Files.controller";
import { FilesService } from "./Files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesEntity } from "./entity/file.entity";
import { FilesAbilityFactory } from "./permission-abilities/files.ability.fsctory";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PropertyModule } from "../property.module";
import { PropertyRepository } from "../repository/property.repository";

@Module({
    imports: [TypeOrmModule.forFeature([FilesEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'), 
      serveRoot: '/uploads', 
    }),
    forwardRef(() => PropertyModule)    ],
    controllers: [FilesController],
    providers: [FilesService, FilesAbilityFactory, PropertyRepository
    ],
    exports: []
})
export class FilesModule { }
