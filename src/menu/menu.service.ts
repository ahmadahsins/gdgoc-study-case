import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import type { DrizzleDB } from 'src/drizzle/types/drizze';
import { menus } from 'src/drizzle/schema';
import { eq, gte, ilike, asc, desc, lte, and, sql } from 'drizzle-orm';
import { MenuQueryDto } from './dto/menu-query.dto';
import { GroupByCategoryQueryDto } from './dto/group-by-category.dto';
import { SearchMenuQueryDto } from './dto/search.dto';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class MenuService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB, private geminiService: GeminiService) {}

  // Helper method to transform menu data (convert price string to number)
  private transformMenuData(menu: any) {
    return {
      ...menu,
      price: typeof menu.price === 'string' ? parseFloat(menu.price) : menu.price,
    };
  }

  async create(createMenuDto: CreateMenuDto) {
    // If description is not provided, generate it using Gemini
    let description = createMenuDto.description;

    if(!description || description.trim() === '') {
      description = await this.geminiService.generateMenuDescription(
        createMenuDto.name,
        createMenuDto.category,
        createMenuDto.ingredients,
        createMenuDto.calories,
      );
    }

    const [insertedMenu] = await this.db
      .insert(menus)
      .values({
        ...createMenuDto,
        description,
      })
      .returning();

    return this.transformMenuData(insertedMenu);
  }

  async findAll(query: MenuQueryDto) {
    const { q, category, min_price, max_price, max_cal, page, per_page, sort } = query;

    const pageNum = Number(page);
    const perPageNum = Number(per_page);

    const [sortField, sortOrder] = sort?.split(':') || ['price', 'asc'];

    // Build where conditions array
    const conditions: any[] = [];

    if (q) {
      conditions.push(ilike(menus.name, `%${q}%`));
    }

    if (category) {
      conditions.push(eq(menus.category, category));
    }

    if (min_price) {
      conditions.push(gte(menus.price, parseFloat(min_price)));
    }

    if (max_price) {
      conditions.push(lte(menus.price, parseFloat(max_price)));
    }

    if (max_cal) {
      conditions.push(lte(menus.calories, parseInt(max_cal)));
    }

    // Build the complete query
    let baseQuery = this.db.select().from(menus);

    // Apply where conditions if any
    const queryWithWhere = conditions.length > 0 
      ? baseQuery.where(and(...conditions)) 
      : baseQuery;

    // Apply sorting if specified
    const queryWithSort = (sortField && sortOrder)
      ? queryWithWhere.orderBy(sortOrder === 'asc' ? asc(menus[sortField]) : desc(menus[sortField]))
      : queryWithWhere;

    // Execute query with pagination
    const results = await queryWithSort
      .limit(perPageNum)
      .offset((pageNum - 1) * perPageNum);

    return results.map(menu => this.transformMenuData(menu));
  }

  async findOne(id: number) {
    const result = await this.db.select().from(menus).where(eq(menus.id, id));

    if(!result[0]) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.transformMenuData(result[0]);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const [updatedMenu] = await this.db.update(menus).set(updateMenuDto).where(eq(menus.id, id)).returning();
    return this.transformMenuData(updatedMenu);
  }

  async remove(id: number) {
    await this.db.delete(menus).where(eq(menus.id, id));
  }

  async groupByCategory(query: GroupByCategoryQueryDto) {
    const { mode, per_category } = query;

    if(mode === "count") {
      const rows = await this.db
        .select({
          category: menus.category,
          count: sql<number>`count(*)`,
        })
        .from(menus)
        .groupBy(menus.category)

      const result: Record<string, number> = {};
      rows.forEach(row => {
        result[row.category] = Number(row.count);
      });

      return result;
    }

    if(mode === "list") {
      const limit = per_category ? Number(per_category) : 5;

      const items = await this.db.select().from(menus);

      const parsed = items.map((m) => this.transformMenuData(m));

      const grouped: Record<string, any[]> = {};

      parsed.forEach((menu) => {
        if (!grouped[menu.category]) grouped[menu.category] = [];
        if (grouped[menu.category].length < limit) {
          grouped[menu.category].push(menu);
        }
      });

      return grouped;
    }
  }

  async search(query: SearchMenuQueryDto) {
    const { q } = query;

    const page = query.page ? Number(query.page) : 1;
    const perPage = query.per_page ? Number(query.per_page) : 10;
    const offset = (page - 1) * perPage;

    const totalRows = await this.db
      .select({ count: sql<number>`COUNT(*)` })
      .from(menus)
      .where(ilike(menus.name, `%${q}%`));

    const total = Number(totalRows[0].count);

    const rows = await this.db
      .select()
      .from(menus)
      .where(ilike(menus.name, `%${q}%`))
      .limit(perPage)
      .offset(offset);

    const data = rows.map((m) => this.transformMenuData(m));

    return {
      data,
      pagination: {
        total,
        page,
        per_page: perPage,
      },
    };
  }
}
