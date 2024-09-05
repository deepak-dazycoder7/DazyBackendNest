import { AppAbility } from 'src/domain/property/permission-abilities/property-ability.factory';
import { PropertyPolicyHandler } from 'src/modules/common/casl/policy.interface';
import { PropertyEntity } from 'src/domain/property/entity/property.entity';
import { Action } from '../enums/action.enum';

export class CreatePropertyHandler implements PropertyPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, PropertyEntity); // Use Action.Create instead of 'create'
  }
}

export class UpdatePropertyHandler implements PropertyPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, PropertyEntity); // Use Action.Update instead of 'update'
  }  
}

export class DeletePropertyHandler implements PropertyPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, PropertyEntity); // Use Action.Delete instead of 'delete'
  }
}

export class ReadPropertyHandler implements PropertyPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, PropertyEntity); // Use Action.Read instead of 'read'
  }
}

export class UploadFileHandler implements PropertyPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Upload, PropertyEntity); // Check if the user can upload files
  }
}
