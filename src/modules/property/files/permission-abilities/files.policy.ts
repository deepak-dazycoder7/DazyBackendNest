import { FilesAppAbility } from './files.ability.fsctory';
import { FilesPolicyHandler } from 'src/modules/common/interfaces/policy.interface';
import { Action } from 'src/modules/common/enums/action.enum';
import { FilesEntity } from '../entity/file.entity';

export class CreateFilesHandler implements FilesPolicyHandler {
    handle(ability: FilesAppAbility): boolean {
        return ability.can(Action.Create, FilesEntity); // Use Action.Create instead of 'create'
    }
}

export class UpdateFilesHandler implements FilesPolicyHandler {
    handle(ability: FilesAppAbility): boolean {
        return ability.can(Action.Update, FilesEntity); // Use Action.Update instead of 'update'
    }
}

export class DeleteFilesHandler implements FilesPolicyHandler {
    handle(ability: FilesAppAbility): boolean {
        return ability.can(Action.Delete, FilesEntity); // Use Action.Delete instead of 'delete'
    }
}

export class ReadFilesHandler implements FilesPolicyHandler {
    handle(ability: FilesAppAbility): boolean {
        return ability.can(Action.Read, FilesEntity); // Use Action.Read instead of 'read'
    }
}

