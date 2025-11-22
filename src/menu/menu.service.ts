import { Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import type { DrizzleDB } from 'src/drizzle/types/drizze';
import { menus } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MenuService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  // Helper method to transform menu data (convert price string to number)
  private transformMenuData(menu: any) {
    return {
      ...menu,
      price: typeof menu.price === 'string' ? parseFloat(menu.price) : menu.price,
    };
  }

  async create(createMenuDto: CreateMenuDto) {
    const [insertedMenu] = await this.db
      .insert(menus)
      .values(createMenuDto)
      .returning();
    return this.transformMenuData(insertedMenu);
  }

  async findAll() {
    const results = await this.db.select().from(menus);
    return results.map(menu => this.transformMenuData(menu));
  }

  async findOne(id: number) {
    const result = await this.db.select().from(menus).where(eq(menus.id, id))
    return this.transformMenuData(result[0]);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const [updatedMenu] = await this.db.update(menus).set(updateMenuDto).where(eq(menus.id, id)).returning();
    return this.transformMenuData(updatedMenu);
  }

  async remove(id: number) {
    await this.db.delete(menus).where(eq(menus.id, id));
  }
}
