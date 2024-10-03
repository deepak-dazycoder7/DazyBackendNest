import { Controller, Get, Post, Body, Param, Inject, Delete, Req, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { SubCategoryService } from './SubCategory.service';
import { SubCategoryDto } from './dtos/SubCategory.dto';
import { SubCategoryEntity } from './entity/subCategory.entity';
import { I18n, I18nContext, } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { SubCategoryGuard } from './guards/sub-category.guard';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateSubCategoryHandler, DeleteSubCategoryHandler, ReadSubCategoryHandler, UpdateSubCategoryHandler } from './permission-abilities/subcategory.policy'

@Controller()
@UseGuards(SubCategoryGuard)
export class SubCategoryController {
    constructor(
        private readonly SubCategoryService: SubCategoryService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService,
    ) { }

    //create
    @Post()
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateSubCategoryHandler()])
    async createSubCategory(@Body() Dto: SubCategoryDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<SubCategoryEntity> {
        try {
            const createdBy = req.user?.sub;
            const SubCategory = await this.SubCategoryService.createSubCategory(Dto, createdBy);
            return this.ResponseService(i18n.t('message.create_success.property'), 200, SubCategory)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //update 
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateSubCategoryHandler()])
    async updateSubCategory(@Param('id') id: number, @Body() Dto: SubCategoryDto, @I18n() i18n: I18nContext): Promise<SubCategoryEntity> {
        try {
            const SubCategory = await this.SubCategoryService.updateSubCategory(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.property'), 200, SubCategory)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //delete 
    @Delete(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new DeleteSubCategoryHandler()])
    async deleteSubCategory(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<void> {
        try {
            const deleteBy = req.user?.sub
            const SubCategory = await this.SubCategoryService.softDeleteSubCategory(id, deleteBy);
            return this.ResponseService(i18n.t('message.delete_success.property'), 200, SubCategory)

        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadSubCategoryHandler()])
    async findAll(@I18n() i18n: I18nContext) {
        try {
            const SubCategory = await this.SubCategoryService.findAll();
            return this.ResponseService(i18n.t('message.fetch_success.property'), 200, SubCategory)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }

    //get one
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadSubCategoryHandler()])
    async findOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<any> {
        try {
            const SubCategory = await this.SubCategoryService.findOne(id);
            return this.ResponseService(i18n.t('message.fetch_success.property'), 200, SubCategory)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}
