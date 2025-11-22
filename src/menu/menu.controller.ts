import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { MenuQueryDto } from './dto/menu-query.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const data = await this.menuService.create(createMenuDto);
    return {
      message: 'Menu created successfully',
      data,
    };
  }

  @Get()
  async findAll(@Query() query: MenuQueryDto) {
    const data = await this.menuService.findAll(query);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.menuService.findOne(+id); 
    return { data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const data = await this.menuService.update(+id, updateMenuDto);
    return {
      message: 'Menu updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.menuService.remove(+id);
    return {
      message: 'Menu deleted successfully',
    };
  }
}
