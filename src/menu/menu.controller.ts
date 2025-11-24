import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { MenuQueryDto } from './dto/menu-query.dto';
import { GroupByCategoryQueryDto } from './dto/group-by-category.dto';
import { SearchMenuQueryDto } from './dto/search.dto';
import { RecomendationQueryDto } from './dto/recomendation-query.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new menu item',
    description: 'Creates a new menu item. If description is not provided, it will be auto-generated using AI.',
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Menu created successfully',
    schema: {
      example: {
        message: 'Menu created successfully',
        data: {
          id: 9,
          name: 'Ayam Geprek',
          category: 'food',
          calories: 520,
          price: 18000,
          ingredients: ['chicken', 'chili', 'batter', 'garlic'],
          description: 'Hand-pounded for ultimate flavor, our crispy battered chicken...',
          created_at: '2025-11-23T00:57:32.914Z',
          updated_at: '2025-11-23T00:57:32.914Z',
        },
      },
    },
  })
  async create(@Body() createMenuDto: CreateMenuDto) {
    const data = await this.menuService.create(createMenuDto);
    return {
      message: 'Menu created successfully',
      data,
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all menu items',
    description: 'Retrieves menu items with filtering, sorting, and pagination.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of menu items',
    schema: {
      example: {
        data: [
          {
            id: 5,
            name: 'Es Kopi Susu',
            category: 'drinks',
            calories: 180,
            price: 25000,
            ingredients: ['coffee', 'milk', 'ice', 'sugar'],
            description: 'Classic iced coffee with milk',
          },
        ],
      },
    },
  })
  async findAll(@Query() query: MenuQueryDto) {
    const data = await this.menuService.findAll(query);
    return { data };
  }

  @Get('group-by-category')
  @ApiOperation({ 
    summary: 'Group menus by category',
    description: 'Groups menu items by category (count or list mode).',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Grouped menu data',
    schema: {
      example: {
        data: {
          food: 6,
          drinks: 4,
        },
      },
    },
  })
  async groupByCategory(@Query() query: GroupByCategoryQueryDto) {
    const data = await this.menuService.groupByCategory(query);
    return { data };
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search menu items',
    description: 'Full-text search for menu items by name.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Search results',
    schema: {
      example: {
        data: [
          {
            id: 5,
            name: 'Es Kopi Susu',
            category: 'drinks',
            calories: 180,
            price: 25000,
          },
        ],
        pagination: {
          total: 2,
          page: 1,
          per_page: 10,
        },
      },
    },
  })
  async search(@Query() query: SearchMenuQueryDto) {
    return await this.menuService.search(query);
  }

  @Get('recommendations')
  @ApiOperation({ 
    summary: 'Get AI-powered menu recommendations',
    description: 'Uses Google Gemini AI to provide personalized menu recommendations.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'AI-generated recommendations',
    schema: {
      example: {
        recommendations: [
          {
            id: 5,
            name: 'Es Kopi Susu',
            category: 'drinks',
            calories: 180,
            price: 25000,
          },
        ],
        reasoning: 'These drinks are perfect for a refreshing experience.',
      },
    },
  })
  async getRecommendations(@Query() query: RecomendationQueryDto) {
    const preferences = {
      maxCalories: query.max_calories ? Number(query.max_calories) : undefined,
      category: query.category,
      dietaryRestrictions: query.dietary_restrictions 
        ? query.dietary_restrictions.split(',').map(s => s.trim())
        : undefined,
      mood: query.mood,
    };

    return await this.menuService.getRecommendations(preferences);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get menu item by ID',
    description: 'Retrieves a single menu item.',
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Menu item ID',
    example: 7,
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu item found',
    schema: {
      example: {
        data: {
          id: 7,
          name: 'Nasi Goreng Spesial',
          category: 'food',
          calories: 520,
          price: 28000,
          ingredients: ['rice', 'egg', 'chicken', 'soy sauce', 'chili'],
          description: 'Nasi goreng dengan ayam, sayur, dan telur khas rumahan.',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  async findOne(@Param('id') id: string) {
    const data = await this.menuService.findOne(+id); 
    return { data };
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update menu item',
    description: 'Updates an existing menu item.',
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Menu item ID',
    example: 7,
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu updated successfully',
    schema: {
      example: {
        message: 'Menu updated successfully',
        data: {
          id: 7,
          name: 'Nasi Goreng Spesial Jumbo',
          category: 'food',
          calories: 600,
          price: 32000,
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    const data = await this.menuService.update(+id, updateMenuDto);
    return {
      message: 'Menu updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete menu item',
    description: 'Deletes a menu item by ID.',
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Menu item ID',
    example: 4,
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Menu deleted successfully',
    schema: {
      example: {
        message: 'Menu deleted successfully',
      },
    },
  })
  async remove(@Param('id') id: string) {
    await this.menuService.remove(+id);
    return {
      message: 'Menu deleted successfully',
    };
  }
}
