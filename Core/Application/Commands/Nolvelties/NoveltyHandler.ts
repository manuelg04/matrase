/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NoveltyCommand, NoveltyActions } from './NoveltyCommand';
import { Inject, Service } from 'typedi';
import { type IHandler } from '../../Contracts/IHandler';
import { INoveltyRepository } from '../../../Domain/Repositories/INoveltiesRepository';

@Service()
export class NoveltyHandler implements IHandler {
  constructor(
    @Inject() private readonly noveltyRepository: INoveltyRepository
  ) {}

  async __invoke(command: NoveltyCommand): Promise<object | string> {
    switch (command.action) {
      case NoveltyActions.CREATE:
        return await this.createNovelty(command);
      case NoveltyActions.UPDATE:
        return await this.updateNovelty(command);
      case NoveltyActions.DELETE:
        return await this.deleteNovelty(command);
      default:
        return {
          Message: 'Acción no válida'
        };
    }
  }

  private async createNovelty(command: NoveltyCommand): Promise<object> {
    try {
      const noveltyData = {
        name: command.name!,
        description: command.description!,
        image_path: command.image_path,
        area_id: command.area_id!
      };

      const createdNovelty = await this.noveltyRepository.createNovelty(
        noveltyData
      );

      return {
        Message: 'Novelty creado exitosamente',
        Data: createdNovelty
      };
    } catch (error) {
      return {
        Message: 'Error al crear la novelty',
        Error: error.message
      };
    }
  }

  private async updateNovelty(command: NoveltyCommand): Promise<object> {
    if (!command.id) {
      return {
        Message: 'ID es necesario para actualizar'
      };
    }

    try {
      const noveltyData = {
        name: command.name!,
        description: command.description!,
        image_path: command.image_path,
        area_id: command.area_id!
      };

      const updatedNovelty = await this.noveltyRepository.updateNovelty(
        command.id,
        noveltyData
      );

      if (!updatedNovelty) {
        return {
          Message: 'Novelty no encontrado'
        };
      }

      return {
        Message: 'Novelty actualizado exitosamente',
        Data: updatedNovelty
      };
    } catch (error) {
      return {
        Message: 'Error al actualizar la novelty',
        Error: error.message
      };
    }
  }

  private async deleteNovelty(command: NoveltyCommand): Promise<object> {
    if (!command.id) {
      return {
        Message: 'ID es necesario para eliminar'
      };
    }

    try {
      const result = await this.noveltyRepository.deleteNovelty(command.id);

      if (!result) {
        return {
          Message: 'Novelty no encontrado'
        };
      }

      return {
        Message: 'Novelty eliminado exitosamente'
      };
    } catch (error) {
      return {
        Message: 'Error al eliminar la novelty',
        Error: error.message
      };
    }
  }
}
