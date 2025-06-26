import { Injectable } from '@nestjs/common';
import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AnimaisService {

  constructor(private prisma: PrismaService) {}


  async create(createAnimaiDto: CreateAnimaiDto) {    
    return await this.prisma.animal.create({
      data: createAnimaiDto
    });
  }

  findAll() {
    return this.prisma.animal.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} animai`;
  }

  update(id: number, updateAnimaiDto: UpdateAnimaiDto) {
    return `This action updates a #${id} animai`;
  }

  remove(id: number) {
    return `This action removes a #${id} animai`;
  }
}
