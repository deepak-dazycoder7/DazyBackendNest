import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { UserEntity } from 'src/entity/user.entity'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    console.log('UserSeeder is running...');

    const admin = await this.userRepository.findOneBy({ role: 'admin' });

    if (!admin) {
      console.log('No admin user found, creating one...');
      const hashedPassword = await bcrypt.hash('admin@34$$#e', 10);
      const newAdmin = this.userRepository.create({
        firstName: 'Admin',
        lastName: 'Adminadmin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      await this.userRepository.save(newAdmin);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}

