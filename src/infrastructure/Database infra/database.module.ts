import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/modules/country/city/entity/city.entity';
import { CountryEntity } from 'src/modules/country/entity/country.entity';
import { StateEntity } from 'src/modules/country/states/entity/state.entity';
import { AddressEntity } from 'src/modules/property/address/entity/Address.entity';
import { CategoryEntity } from 'src/modules/property/category/entity/category.entity';
import { DivisionEntity } from 'src/modules/property/division/entity/division.entity';
import { PropertyEntity } from 'src/modules/Property/entity/property.entity';
import { PropertyTypeEntity } from 'src/modules/property/property-type/entity/property-type.entity';
import { SubCategoryEntity } from 'src/modules/property/sub-category/entity/subCategory.entity';
import { UserEntity } from 'src/modules/users/entity/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'dazynestdb',
        entities: [UserEntity, PropertyEntity, PropertyTypeEntity, DivisionEntity, CategoryEntity, CountryEntity, StateEntity, CityEntity, SubCategoryEntity, AddressEntity],
        synchronize: true,
        //logging: true,
      }),
  ],
})
export class DatabaseModule {}
