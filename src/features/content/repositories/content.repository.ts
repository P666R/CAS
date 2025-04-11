import { ContentFilter } from '../interfaces/content.interface';
import { Content } from '../models/content.model';
import { CreateContentDTO, UpdateContentDTO } from '../schemas/content.schema';

export class ContentRepository {
  constructor(private readonly contentModel: typeof Content) {}

  public async createContent(contentData: CreateContentDTO & { submittedBy: string }) {
    return this.contentModel.create(contentData);
  }

  public async findAllContents(filter: ContentFilter) {
    return this.contentModel.find(filter).populate('submittedBy', 'username email');
  }

  public async findContentById(id: string) {
    return this.contentModel.findById(id).populate('submittedBy', 'username email');
  }

  public async updateContentById(id: string, contentData: UpdateContentDTO) {
    return this.contentModel
      .findByIdAndUpdate(id, contentData, { new: true })
      .populate('submittedBy', 'username email');
  }
}
