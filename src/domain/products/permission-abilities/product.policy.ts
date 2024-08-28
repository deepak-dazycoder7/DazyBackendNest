import { AppAbility } from 'src/domain/products/permission-abilities/product-ability.factory';
import { ProductPolicyHandler } from 'src/modules/common/casl/policy.interface';
import { ProductEntity } from 'src/domain/products/entity/product.entity';
import { Action } from '../enums/action.enum';

export class CreateProductHandler implements ProductPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, ProductEntity); // Use Action.Create instead of 'create'
  }
}

export class UpdateProductHandler implements ProductPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, ProductEntity); // Use Action.Update instead of 'update'
  }  
}

export class DeleteProductHandler implements ProductPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, ProductEntity); // Use Action.Delete instead of 'delete'
  }
}

export class ReadProductHandler implements ProductPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, ProductEntity); // Use Action.Read instead of 'read'
  }
}

export class UploadFileHandler implements ProductPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Upload, ProductEntity); // Check if the user can upload files
  }
}
