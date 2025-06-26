import { Injectable } from '@nestjs/common';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OngsService {

  constructor(private prisma : PrismaService){}

  async create(createOngDto: CreateOngDto) {
    return await this.prisma.ong.create({
      data: createOngDto
    });
  }

  findAll() {
    return `This action returns all ongs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ong`;
  }

  update(id: number, updateOngDto: UpdateOngDto) {
    return `This action updates a #${id} ong`;
  }

  remove(id: number) {
    return `This action removes a #${id} ong`;
  }
}
