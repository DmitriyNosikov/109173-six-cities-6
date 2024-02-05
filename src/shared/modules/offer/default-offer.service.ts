import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';

const MessageText = {
  ADDED: 'New offer successfully added. Offer ID:'
} as const;
@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.Logger) private readonly logger: Logger
  ){}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(dto);

    this.logger.info(`${MessageText.ADDED} ${offer.id}`);

    return offer;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById({ id }).exec();
  }
}
