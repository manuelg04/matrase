import { type AreaCommand, AreaActions } from './AreaCommand';
import { Inject, Service } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { IAreaRepository } from '../../../Domain/Repositories/IAreasRepository';

@Service()
export class AreaHandler implements IHandler {
  constructor(@Inject() private readonly areaRepository: IAreaRepository) {}

  async __invoke(command: AreaCommand): Promise<object> {
    switch (command.action) {
      case AreaActions.CREATE:
        return await this.createArea(command);
      case AreaActions.UPDATE:
        return await this.updateArea(command);
      case AreaActions.DELETE:
        return await this.deleteArea(command);
      default:
        return { Message: 'Acción no válida' };
    }
  }

  private async createArea(command: AreaCommand): Promise<object> {
    const createdArea = await this.areaRepository.createArea({
      name: command.name!
    });
    return {
      Message: 'Área creada exitosamente',
      Data: createdArea
    };
  }

  private async updateArea(command: AreaCommand): Promise<object> {
    const updatedArea = await this.areaRepository.updateArea(command.id!, {
      name: command.name
    });
    return {
      Message: 'Área actualizada exitosamente',
      Data: updatedArea
    };
  }

  private async deleteArea(command: AreaCommand): Promise<object> {
    const result = await this.areaRepository.deleteArea(command.id!);
    return {
      Message: result ? 'Área eliminada exitosamente' : 'Área no encontrada'
    };
  }
}
