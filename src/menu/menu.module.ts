import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [DrizzleModule],
})
export class MenuModule {}
