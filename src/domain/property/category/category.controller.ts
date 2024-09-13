import { Body, Controller, Post, Put, Param, Delete, Inject, Get, Req, UnauthorizedException, UseGuards, SetMetadata,  } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create.category.dto';
import { UpdateCategoryDto } from './dtos/update.category.dto';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CategoryGuard } from './guard/category.guard';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateCategoryHandler, DeleteCategoryHandler, ReadCategoryHandler, UpdateCategoryHandler } from './permission-abilities/category.policy';

@Controller('property/category')
@UseGuards(CategoryGuard)
export class CategoryController {
    constructor(
        private readonly categroyService: CategoryService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create 
    @Post('create')
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateCategoryHandler()])
    async createCategory(@Body() dto: CreateCategoryDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
        try {
            const createdBy = req.user?.sub;
            if (!createdBy) {
                throw new UnauthorizedException('User not authenticated');
            }
            const category = await this.categroyService.createCategory(dto, createdBy);
            return this.ResponseService(i18n.t('message.create_success.category'), 200, category);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    //update 
    @Put('update/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateCategoryHandler()])
    async updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const category = await this.categroyService.updateCategory(id, dto);
            return this.ResponseService(i18n.t('message.update_success.category'), 200, category);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }

    // delete 
    @Delete('remove/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeleteCategoryHandler()])
    async removeCategory(
        @Param('id',) id: number,
        @I18n() i18n: I18nContext,
        @Req() req: CustomRequest
    ): Promise<string> {
        try {
            const deletedBy = req.user?.sub;
            if (!deletedBy) {
                throw new UnauthorizedException(i18n.t('message.unauthorized'));
            }
            await this.categroyService.softDeleteCategory(id, deletedBy);

            return this.ResponseService(i18n.t('message.delete_success.category'), 200, null);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }


    // Get/read 
    @Get('/:id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCategoryHandler()])
    async getOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const category = await this.categroyService.findOne(id);
            return this.ResponseService(i18n.t('message.fetch_success.category'), 200, category)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //Get all
    @Get('all')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadCategoryHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const category = await this.categroyService.findAllCategory();
            return this.ResponseService(i18n.t('message.fetch_success.category'), 200, category);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}

