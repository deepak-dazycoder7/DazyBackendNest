import { Module } from "@nestjs/common";
import { FilesController } from "./Files.controller";
import { FilesService } from "./Files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesEntity } from "./entity/file.entity";
import { FilesAbilityFactory } from "./permission-abilities/files.ability.fsctory";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    imports: [TypeOrmModule.forFeature([FilesEntity]),
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', '..', 'uploads'), 
      }),
    ],
    controllers: [FilesController],
    providers: [FilesService, FilesAbilityFactory],
})
export class FilesModule { }
