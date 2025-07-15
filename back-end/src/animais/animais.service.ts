import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimaisService {
  constructor(private prisma: PrismaService) {}

  async create(createAnimaiDto: CreateAnimaiDto) {
    return await this.prisma.animal.create({
      data: createAnimaiDto,
    });
  }

  findAll() {
    return this.prisma.animal.findMany({
      include: {
        ong: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      include: {
        ong: {
          select: {
            nome: true,
          },
        },
      },
    });

    if (!animal) {
      throw new NotFoundException(`Animal com ID ${id} não encontrado.`);
    }
    return animal;
  }

  async update(id: number, updateAnimaiDto: UpdateAnimaiDto) {   
    await this.findOne(id); 
    return await this.prisma.animal.update({
      where: { id },
      data: updateAnimaiDto,
    });
  }

  async remove(id: number) {    
    await this.findOne(id);;
    return await this.prisma.animal.delete({
      where: { id },
    });
  }
}