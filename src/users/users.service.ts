import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCredentials } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepositpry: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = this.userRepositpry.create({
      ...createUserDto
    });

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    try {
      await this.userRepositpry.save(user);
    } catch(e) {
      throw new ConflictException("l'email doit etre unique");
    }

    return {
      id: user.id,
      email: user.email,
      city: user.city,
      address: user.address,
      role: user.role,
      company_name: user.company_name,
      indus_type: user.indus_type
    }
  }

  async login(credentials: LoginCredentials) {
    const {email, password} = credentials;
    const user = await this.userRepositpry.createQueryBuilder('user')
                  .where("user.email = :email", {
                    email: email
                  })
                  .getOne();
    if(!user) {
      throw new NotFoundException('user not found');
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    const payload = {
      id: user.id,
      email: user.email,
      city: user.city,
      address: user.address,
      role: user.role,
      company_name: user.company_name,
      indus_type: user.indus_type
    };
    const jwt = this.jwtService.sign(payload);
    if(hashedPassword === user.password){
      return {
        access_token: jwt
      }
    } else {
      return 'problem occured';
    }

  }

  async findAll(): Promise<User[]> {
    return await this.userRepositpry.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepositpry.findOneBy({id: id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newUser = await this.userRepositpry.preload({
      id,
      ...updateUserDto
    });
    return await this.userRepositpry.save(newUser);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    if(!userToRemove) {
      throw new NotFoundException('user does not exist!')
    }
    return await this.userRepositpry.remove(userToRemove);
  }

}
