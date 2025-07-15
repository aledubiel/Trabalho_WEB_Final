import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OngsService {
  constructor(private prisma: PrismaService) {}

  async create(createOngDto: CreateOngDto) {
    return await this.prisma.ong.create({
      data: createOngDto,
    });
  }

  findAll() {
    return this.prisma.ong.findMany({
      include: {
        animais: {
          select: {
            id: true,
            nome: true,
            especie: true,
          },
        },
        usuarios: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const ong = await this.prisma.ong.findUnique({
      where: { id },
      include: {
        animais: {
          select: {
            id: true,
            nome: true,
            especie: true,
          },
        },
        usuarios: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    if (!ong) {
      throw new NotFoundException(`ONG com ID ${id} não encontrada.`);
    }
    return ong;
  }

  async update(id: number, updateOngDto: UpdateOngDto) {
    await this.findOne(id);

    return await this.prisma.ong.update({
      where: { id },
      data: updateOngDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);;

    return await this.prisma.ong.delete({
      where: { id },
    });
  }
}
