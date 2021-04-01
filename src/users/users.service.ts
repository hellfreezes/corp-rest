import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User, UserDocument} from './entities/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();

    return result._id;
  }

  async findAll() {
    return await this.userModel.find().exec() as User[];
  }

  async findOneById(id: string) {
    return await this.findUserById(id);
  }

  async findOneByEmail(email: string) {
    return await this.findUserByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private async findUserById(id: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (id) {
      throw new NotFoundException('User not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async findUserByEmail(email: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findOne({ email: email }).exec();
    } catch (id) {
      throw new NotFoundException('User not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
